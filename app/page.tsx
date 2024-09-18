'use client';

import React from 'react';

import {
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Icon,
  InlineCode,
  Logo,
  Background,
  LetterFx,
} from './once-ui/components';

export default function Home() {
  return (
    <Flex
      fillWidth
      paddingTop='l'
      paddingX='l'
      direction='column'
      alignItems='center'
      flex={1}>
      <Background dots={false} />
      <Flex
        position='relative'
        as='section'
        overflow='hidden'
        fillWidth
        minHeight='0'
        maxWidth={68}
        direction='column'
        alignItems='center'
        flex={1}>
        <Flex
          as='main'
          direction='column'
          justifyContent='center'
          fillWidth
          fillHeight
          padding='l'
          gap='l'>
          <Flex mobileDirection='column' fillWidth gap='24'>
            <Flex
              position='relative'
              flex={4}
              gap='24'
              marginBottom='104'
              direction='column'>
              <InlineCode
                className='shadow-m'
                style={{
                  width: 'fit-content',
                  padding: 'var(--static-space-8) var(--static-space-16)',
                  backdropFilter: 'blur(var(--static-space-1))',
                }}>
                Post to{' '}
                <span className='brand-on-background-medium'>api/create</span>
              </InlineCode>
              <Heading wrap='balance' variant='display-strong-s'>
                <span className='font-code'>
                  <LetterFx trigger='instant'>
                    {'Slack ➡ Google Sheets ➡ Airtable'}
                  </LetterFx>
                </span>
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
