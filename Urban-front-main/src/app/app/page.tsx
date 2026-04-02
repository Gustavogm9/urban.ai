'use client';

import React, { useState } from 'react';
import {
  Flex, VStack, Box, Heading, Text, Input,
  FormControl, FormLabel, Switch, Stack,
  Button, Image, Container
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import '../../../i18n';
import { getHostId, getUserManagedListings, registerProperties, createMultipleAddresses, resolveAirbnbUrl } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';

const MotionBox = motion(Box);

interface Property {
  id: number;
  titulo: string;
  id_do_anuncio: string;
  ativo: boolean;
  pictureUrl: string;
}

interface RegisteredProperty {
  id: string;
  titulo: string;
  id_do_anuncio: string;
  pictureUrl: string;
  ativo: boolean;
  user?: { id: string };
}

interface SelectedPropertiesState {
  [key: string]: boolean;
}

export default function ConectarAirbnb() {
  const { t } = useTranslation();
  const router = useRouter();

  // State para os passos do Onboarding: 1 = Bem-vindo, 2 = Inserção Link, 3 = Seleção, 4 = Finalizando
  const [step, setStep] = useState(1);

  const [airbnbLink, setAirbnbLink] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<SelectedPropertiesState>({});
  const [selectAll, setSelectAll] = useState(false);

  const extractAirbnbUserId = (link: string): string | null => {
    if (!link || !link.includes('airbnb.com')) return null;
    const regex = /\/users\/show\/(\d+)/;
    const match = link.match(regex);
    return match && match[1] ? match[1] : null;
  };

  const extractAirbnbPropertyId = (link: string): string | null => {
    if (!link || !link.includes('airbnb.com')) return null;

    const patterns = [
      /\/rooms\/(\d+)/,
      /airbnb\.com\.?\w*\/rooms\/(\d+)/i,
      /airbnb\.com\.?\w*\/p\/(\d+)/i
    ];

    for (const regex of patterns) {
      const match = link.match(regex);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const extractAirbnbListingId = (url: string): string | null => {
    try {
      const regex = /editor\/(\d+)\/details/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Erro ao extrair ID do Airbnb:', error);
      return null;
    }
  };

  const initializeSelectedProperties = (list: Property[]) => {
    const initialSelectedState: SelectedPropertiesState = {};
    list.forEach(prop => {
      initialSelectedState[prop.id_do_anuncio] = true; // Por padrão, sugerimos registrar tudo
      prop.ativo = true;
    });
    setSelectedProperties(initialSelectedState);
    setSelectAll(list.length > 0);
  };

  const fetchUserProperties = async () => {
    if (!airbnbLink) {
      toast("Para continuar, insira um link do Airbnb.", { type: "info" });
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await resolveAirbnbUrl(airbnbLink);
      setAirbnbLink(result.finalUrl);

      const id = extractAirbnbListingId(airbnbLink);
      let urlEditor = null;
      if (id) {
        const newUrl = `https://www.airbnb.com/rooms/${id}`;
        urlEditor = newUrl;
      }

      const propertyIdExtracted = extractAirbnbPropertyId(urlEditor ? urlEditor : result.finalUrl);

      let userIdFromGetHostId = null;
      if (propertyIdExtracted) {
        const data = await getHostId(propertyIdExtracted);
        userIdFromGetHostId = data?.result.hostId;
      }

      let userId = userIdFromGetHostId || extractAirbnbUserId(urlEditor ? urlEditor : result.finalUrl);

      if (!userId) {
        toast("Por favor, insira um link válido do perfil ou imóvel do Airbnb.", { type: "error" });
        setIsLoading(false);
        return;
      }

      const listings = await getUserManagedListings(userId);

      if (!listings || listings.length === 0) {
        toast("Não encontramos imóveis neste perfil.", { type: "warning" });
        setIsLoading(false);
        return;
      }

      const mappedProperties: Property[] = listings.map((item: any) => ({
        id: item.id || 0,
        titulo: item.titulo ?? item.name ?? 'Sem título',
        id_do_anuncio: item.id_do_anuncio ?? '',
        ativo: true,
        pictureUrl: item.pictureUrl ?? '',
      }));

      setProperties(mappedProperties);
      initializeSelectedProperties(mappedProperties);
      setStep(3); // Avança pra tela de seleção de properties

    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      toast("Não foi possível buscar seus imóveis. Verifique o link e tente novamente.", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePropertyToggle = (id_do_anuncio: string) => {
    setSelectedProperties(prev => {
      const newSelected = { ...prev, [id_do_anuncio]: !prev[id_do_anuncio] };
      setSelectAll(Object.values(newSelected).every(Boolean));
      return newSelected;
    });
  };

  const handleSelectAllToggle = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedSelectedState: SelectedPropertiesState = {};
    properties.forEach(prop => {
      updatedSelectedState[prop.id_do_anuncio] = newSelectAll;
    });
    setSelectedProperties(updatedSelectedState);
  };

  const handleRegisterProperties = async () => {
    const selectedPropertiesList = properties.filter(
      prop => selectedProperties[prop.id_do_anuncio] === true
    );

    if (selectedPropertiesList.length === 0) {
      toast("Por favor, selecione pelo menos uma propriedade.", { type: "warning" });
      return;
    }

    try {
      setIsLoading(true);
      const toRegister = selectedPropertiesList.map(prop => ({
        id: prop.id,
        titulo: prop.titulo,
        id_do_anuncio: prop.id_do_anuncio,
        ativo: true,
        pictureUrl: prop.pictureUrl,
      }));

      // Passo 1: Registra as propriedades
      const response = await registerProperties(toRegister);
      const registered: RegisteredProperty[] = Array.isArray((response as any)?.data)
        ? (response as any).data
        : (response as any);

      if (Array.isArray(registered)) {
        localStorage.setItem('registeredProperties', JSON.stringify(registered));
      }

      // Passo 2: Cria endereços usando endpoint correto
      const addressesToRegister = registered.map((prop: any) => {
        const estado = 'A definir';
        return {
          cep: '00000-000', 
          numero: 'S/N',
          logradouro: 'A definir',
          bairro: 'A definir',
          cidade: 'A definir',
          estado: estado.length > 2 ? estado.substring(0, 2) : null,
          list: { 
            id: prop.id_do_anuncio
          },
        };
      });

      await createMultipleAddresses(addressesToRegister);
      
      setStep(4); // Vai pra etapa de tela verde / loading
      toast("Processo concluído com sucesso!", { type: "success" });

      // Redireciona direto para dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);

    } catch (error) {
      console.error('Erro ao registrar propriedades:', error);
      toast("Falha ao configurar propriedades. Tente novamente.", { type: "error" });
      setIsLoading(false);
    }
  };

  // Variações de animação
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
  };

  return (
    <Flex w="100%" minH="100vh" direction="column" bg="gray.50" align="center" p={{ base: 4, md: 8 }}>
      {/* Mini Topbar com Logo para contexto */}
      <Flex w="100%" justify="center" py={6} mb={4}>
        <Image src="/ul.png" alt="Urban AI Logo" height="auto" width="160px" />
      </Flex>

      <Container maxW="container.md">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg="white"
          borderRadius="2xl"
          boxShadow="lg"
          p={{ base: 6, md: 12 }}
          overflow="hidden"
        >
          <AnimatePresence mode="wait">
            
            {/* --- PASSO 1: Boas Vindas --- */}
            {step === 1 && (
              <MotionBox
                key="step1"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.4 }}
              >
                <VStack spacing={6} align="center" textAlign="center">
                  <Box p={4} bg="blue.50" borderRadius="full">
                    <Image src="/ularanja.png" w="40px" h="40px" alt="Icone Urban AI"/>
                  </Box>
                  <Heading size="xl" color="gray.800">
                    Bem-vindo ao Urban AI!
                  </Heading>
                  <Text fontSize="lg" color="gray.600" maxW="400px">
                    Para começarmos a multiplicar a receita e automatizar seu trabalho, precisamos conectar sua conta do Airbnb para escanearmos sua área e seu mercado local.
                  </Text>
                  
                  <Button
                    mt={4}
                    bg="#ff5a5f" // Cor remetendo muito levemente a hospitalidade, ou use seu laranja primário
                    color="white"
                    size="lg"
                    px={10}
                    h="56px"
                    fontSize="lg"
                    _hover={{ bg: '#e0484d', transform: 'translateY(-2px)' }}
                    _active={{ bg: '#d43b40' }}
                    transition="all 0.2s"
                    onClick={() => setStep(2)}
                  >
                    Começar configuração rápida
                  </Button>
                </VStack>
              </MotionBox>
            )}

            {/* --- PASSO 2: Inserção do Link --- */}
            {step === 2 && (
              <MotionBox
                key="step2"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.4 }}
              >
                <VStack spacing={8} align="stretch">
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.400" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" mb={2}>Passo 1 de 2</Text>
                    <Heading size="lg" mb={3} color="gray.800">Identificando seu Perfil</Heading>
                    <Text color="gray.600">
                      O processo é totalmente seguro. Não precisamos de sua senha, apenas da URL pública do seu perfil ou anúncio.
                    </Text>
                  </Box>

                  <FormControl>
                    <FormLabel fontSize="md" fontWeight="semibold" color="gray.700">
                      {t('airbnb_profile_link', 'Link do Perfil do Airbnb ou Link de um Anúncio')}
                    </FormLabel>
                    <Input
                      size="lg"
                      type="url"
                      placeholder="Ex: https://www.airbnb.com.br/users/show/123456789"
                      value={airbnbLink}
                      onChange={(e) => setAirbnbLink(e.target.value)}
                      focusBorderColor="blue.500"
                      bg="gray.50"
                      border="2px solid"
                      borderColor="gray.200"
                      _hover={{ borderColor: "gray.300" }}
                      h="60px"
                    />
                  </FormControl>

                  <Flex gap={4}>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setStep(1)}
                      color="gray.500"
                    >
                      Voltar
                    </Button>
                    <Button
                      bg="#2E3748"
                      color="white"
                      _hover={{ bg: '#252E3E' }}
                      _active={{ bg: '#1B2330' }}
                      size="lg"
                      flex={1}
                      isLoading={isLoading}
                      loadingText={t('searching_properties', 'Pesquisando imóveis...')}
                      onClick={fetchUserProperties}
                    >
                      Buscar minhas propriedades
                    </Button>
                  </Flex>

                </VStack>
              </MotionBox>
            )}

            {/* --- PASSO 3: Seleção das Propriedades --- */}
            {step === 3 && (
              <MotionBox
                key="step3"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.4 }}
              >
                <VStack spacing={6} align="stretch">
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.400" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" mb={2}>Passo 2 de 2</Text>
                    <Heading size="lg" mb={2} color="gray.800">Selecionar Imóveis</Heading>
                    <Text color="gray.600">
                      Encontramos {properties.length} {properties.length === 1 ? 'imóvel' : 'imóveis'} em seu perfil. Quais deseja vincular ao motor inteligente?
                    </Text>
                  </Box>

                  <Box p={4} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
                    <FormControl
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={4}
                      pb={4}
                      borderBottom="1px solid"
                      borderColor="gray.300"
                    >
                      <FormLabel mb="0" fontWeight="bold" color="gray.800">
                        {t('select_all_listings', 'Ativar motor para todos')}
                      </FormLabel>
                      <Switch
                        colorScheme="green"
                        size="lg"
                        isChecked={selectAll}
                        onChange={handleSelectAllToggle}
                      />
                    </FormControl>

                    <Stack spacing={3} maxH="300px" overflowY="auto" pr={2}>
                      {properties.map((property) => (
                        <FormControl
                          key={property.id_do_anuncio}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          bg="white"
                          p={3}
                          borderRadius="md"
                          border="1px solid"
                          borderColor={selectedProperties[property.id_do_anuncio] ? 'blue.200' : 'gray.200'}
                          boxShadow="sm"
                          transition="all 0.2s"
                        >
                          <Flex align="center" gap={3}>
                            {property.pictureUrl ? (
                              <Image 
                                src={property.pictureUrl} 
                                alt={property.titulo} 
                                boxSize="40px" 
                                objectFit="cover" 
                                borderRadius="md" 
                              />
                            ) : (
                              <Box boxSize="40px" bg="gray.200" borderRadius="md" />
                            )}
                            <FormLabel mb="0" fontWeight="medium" color="gray.700" noOfLines={1} maxW="250px">
                              {property.titulo}
                            </FormLabel>
                          </Flex>
                          <Switch
                            colorScheme="blue"
                            isChecked={selectedProperties[property.id_do_anuncio] || false}
                            onChange={() => handlePropertyToggle(property.id_do_anuncio)}
                          />
                        </FormControl>
                      ))}
                    </Stack>
                  </Box>

                  <Flex gap={4} mt={2}>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setStep(2)}
                      color="gray.500"
                      isDisabled={isLoading}
                    >
                      Voltar
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="lg"
                      flex={1}
                      onClick={handleRegisterProperties}
                      isDisabled={properties.length === 0 || Object.values(selectedProperties).every(val => val === false)}
                      isLoading={isLoading}
                      loadingText="Salvando no sistema..."
                    >
                      Finalizar configuração
                    </Button>
                  </Flex>
                </VStack>
              </MotionBox>
            )}

            {/* --- PASSO 4: Sucesso --- */}
            {step === 4 && (
              <MotionBox
                key="step4"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.4 }}
              >
                <VStack spacing={6} align="center" textAlign="center" py={10}>
                  <Box p={6} bg="green.50" borderRadius="full" color="green.500">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </Box>
                  <Heading size="lg" color="gray.800">
                    Você está pronto!
                  </Heading>
                  <Text fontSize="md" color="gray.600" maxW="400px">
                    Os dados foram importados com sucesso. Estamos direcionando você para o seu novo painel operacional, onde faremos as leituras do mercado que envolve seus imóveis.
                  </Text>
                  <Spinner color="blue.500" size="lg" mt={4} />
                </VStack>
              </MotionBox>
            )}

          </AnimatePresence>
        </MotionBox>
      </Container>
      
      <ToastContainer position="top-right" />
    </Flex>
  );
}
