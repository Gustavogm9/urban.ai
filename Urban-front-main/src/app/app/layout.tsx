"use client"
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" bg="#f8fafb" direction="column">
      <Box as="main" flex="1">
        {children}
      </Box>
    </Flex>
  )
}
