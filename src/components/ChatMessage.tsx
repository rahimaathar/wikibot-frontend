import { Box, Text, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useColorMode } from '@chakra-ui/react';
import { FaUser, FaRobot } from 'react-icons/fa';

interface ChatMessageProps {
    message: string;
    isUser: boolean;
    timestamp?: string;
    isTyping?: boolean;
    colorMode?: 'light' | 'dark';
}

const typingAnimation = keyframes`
    0% { content: '.'; }
    33% { content: '..'; }
    66% { content: '...'; }
    100% { content: '.'; }
`;

const TypingIndicator = () => (
    <Flex gap={1} align="center">
        <Box
            w="2px"
            h="2px"
            bg="gray.400"
            borderRadius="full"
            animation={`${typingAnimation} 1s infinite`}
        />
        <Box
            w="2px"
            h="2px"
            bg="gray.400"
            borderRadius="full"
            animation={`${typingAnimation} 1s infinite 0.2s`}
        />
        <Box
            w="2px"
            h="2px"
            bg="gray.400"
            borderRadius="full"
            animation={`${typingAnimation} 1s infinite 0.4s`}
        />
    </Flex>
);

const ChatMessage = ({ message, isUser, timestamp, isTyping, colorMode }: ChatMessageProps) => {
    const { colorMode: chakraColorMode } = useColorMode();
    const currentColorMode = colorMode || chakraColorMode;

    return (
        <Flex
            justify={isUser ? 'flex-end' : 'flex-start'}
            width="100%"
        >
            <Box
                maxW="70%"
                bg={isUser ? 'brand.500' : currentColorMode === 'dark' ? 'gray.700' : 'white'}
                color={isUser ? 'white' : currentColorMode === 'dark' ? 'white' : 'black'}
                p={4}
                borderRadius="lg"
                boxShadow="sm"
            >
                {isTyping ? (
                    <Text>
                        Typing
                        <Text as="span" sx={{
                            '&::after': {
                                content: '""',
                                animation: `${typingAnimation} 1.5s infinite`
                            }
                        }}></Text>
                    </Text>
                ) : (
                    <>
                        <Text whiteSpace="pre-wrap">{message}</Text>
                        {timestamp && (
                            <Text fontSize="xs" color={isUser ? 'whiteAlpha.800' : currentColorMode === 'dark' ? 'gray.400' : 'gray.600'} mt={2}>
                                {timestamp}
                            </Text>
                        )}
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default ChatMessage; 