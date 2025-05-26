import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    IconButton,
    useToast,
    Divider,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    useBreakpointValue,
    useColorMode,
    Switch,
    HStack,
    Tooltip,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Spacer,
} from '@chakra-ui/react';
import { FaPaperPlane, FaPlus, FaBars, FaMoon, FaSun, FaChevronLeft, FaChevronRight, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import axios from 'axios';

interface Message {
    content: string;
    isUser: boolean;
    timestamp: string;
}

interface Chat {
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
}

const ChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recentChats, setRecentChats] = useState<Chat[]>([]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { colorMode, toggleColorMode } = useColorMode();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleNewChat = () => {
        setMessages([]);
        setInput('');
        if (isMobile) {
            onClose();
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            content: input,
            isUser: true,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('https://wikibot-backend.onrender.com/api/query', {
                query: input,
                conversation_history: messages,
            });

            const botMessage: Message = {
                content: response.data.response,
                isUser: false,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, botMessage]);

            // Update recent chats
            const newChat: Chat = {
                id: Date.now().toString(),
                title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
                lastMessage: response.data.response.slice(0, 50) + (response.data.response.length > 50 ? '...' : ''),
                timestamp: new Date().toLocaleTimeString(),
            };
            setRecentChats((prev) => [newChat, ...prev].slice(0, 5));
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to get response from the server',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const SidebarContent = () => (
        <VStack spacing={4} align="stretch" h="100%">
            {!isSidebarCollapsed ? (
                <>
                    <Flex align="center" justify="space-between" px={2}>
                        <Text fontSize="xl" fontWeight="bold" color="brand.500">
                            ...
                        </Text>
                        {!isMobile && (
                            <Tooltip label="Collapse sidebar">
                                <IconButton
                                    aria-label="Collapse sidebar"
                                    icon={<FaChevronLeft />}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsSidebarCollapsed(true)}
                                />
                            </Tooltip>
                        )}
                    </Flex>
                    <Divider />
                    <Button
                        leftIcon={<FaPlus />}
                        colorScheme="brand"
                        onClick={handleNewChat}
                        size="lg"
                        mx={2}
                    >
                        New Chat
                    </Button>
                    <Divider />
                    <HStack justify="space-between" px={2}>
                        <Text fontSize="sm" color={colorMode === 'dark' ? "gray.400" : "gray.600"} fontWeight="bold">
                            Theme
                        </Text>
                        <HStack>
                            <FaSun />
                            <Switch
                                isChecked={colorMode === 'dark'}
                                onChange={toggleColorMode}
                                colorScheme="brand"
                            />
                            <FaMoon />
                        </HStack>
                    </HStack>
                    <Divider />
                    <Text fontSize="sm" color={colorMode === 'dark' ? "gray.400" : "gray.600"} fontWeight="bold" px={2}>
                        Recent Chats
                    </Text>
                    <VStack spacing={2} align="stretch" overflowY="auto" flex={1}>
                        {recentChats.map((chat) => (
                            <Button
                                key={chat.id}
                                variant="ghost"
                                justifyContent="flex-start"
                                h="auto"
                                p={3}
                                onClick={() => {
                                    if (isMobile) {
                                        onClose();
                                    }
                                }}
                            >
                                <VStack align="start" spacing={1} w="100%">
                                    <Text fontSize="sm" fontWeight="medium" noOfLines={1} color={colorMode === 'dark' ? "white" : "black"}>
                                        {chat.title}
                                    </Text>
                                    <Text fontSize="xs" color={colorMode === 'dark' ? "gray.500" : "gray.600"} noOfLines={1}>
                                        {chat.lastMessage}
                                    </Text>
                                    <Text fontSize="xs" color={colorMode === 'dark' ? "gray.400" : "gray.500"}>
                                        {chat.timestamp}
                                    </Text>
                                </VStack>
                            </Button>
                        ))}
                    </VStack>
                    <Divider />
                    <VStack spacing={2} align="stretch" px={2}>
                        <Button
                            variant="ghost"
                            leftIcon={<FaCog />}
                            justifyContent="flex-start"
                            size="sm"
                            color={colorMode === 'dark' ? "white" : "black"}
                        >
                            Settings
                        </Button>
                        <Button
                            variant="ghost"
                            leftIcon={<FaQuestionCircle />}
                            justifyContent="flex-start"
                            size="sm"
                            color={colorMode === 'dark' ? "white" : "black"}
                        >
                            Help & FAQ
                        </Button>
                    </VStack>
                </>
            ) : (
                <VStack spacing={4} align="center" h="100%">
                    <Tooltip label="Expand sidebar" placement="right">
                        <IconButton
                            aria-label="Expand sidebar"
                            icon={<FaChevronRight />}
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsSidebarCollapsed(false)}
                            color={colorMode === 'dark' ? "white" : "black"}
                        />
                    </Tooltip>
                    <Divider />
                    <Tooltip label="New Chat" placement="right">
                        <IconButton
                            aria-label="New Chat"
                            icon={<FaPlus />}
                            colorScheme="brand"
                            onClick={handleNewChat}
                        />
                    </Tooltip>
                    <Tooltip label="Theme" placement="right">
                        <HStack>
                            <FaSun color={colorMode === 'dark' ? "white" : "black"} />
                            <Switch
                                isChecked={colorMode === 'dark'}
                                onChange={toggleColorMode}
                                colorScheme="brand"
                            />
                            <FaMoon color={colorMode === 'dark' ? "white" : "black"} />
                        </HStack>
                    </Tooltip>
                    <Spacer />
                    <VStack spacing={2}>
                        <Tooltip label="Settings" placement="right">
                            <IconButton
                                aria-label="Settings"
                                icon={<FaCog />}
                                variant="ghost"
                                size="sm"
                                color={colorMode === 'dark' ? "white" : "black"}
                            />
                        </Tooltip>
                        <Tooltip label="Help & FAQ" placement="right">
                            <IconButton
                                aria-label="Help & FAQ"
                                icon={<FaQuestionCircle />}
                                variant="ghost"
                                size="sm"
                                color={colorMode === 'dark' ? "white" : "black"}
                            />
                        </Tooltip>
                    </VStack>
                </VStack>
            )}
        </VStack>
    );

    return (
        <Flex h="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
            {/* Mobile Drawer */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerBody p={4}>
                        <SidebarContent />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Desktop Sidebar */}
            {!isMobile && (
                <Box
                    w={isSidebarCollapsed ? "80px" : "300px"}
                    bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                    p={4}
                    borderRight="1px"
                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                    display={{ base: 'none', md: 'block' }}
                    transition="width 0.2s ease-in-out"
                >
                    <SidebarContent />
                </Box>
            )}

            {/* Main Chat Area */}
            <Flex flex={1} direction="column">
                {/* Header */}
                <Flex
                    p={4}
                    bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                    borderBottom="1px"
                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                    align="center"
                    justify="space-between"
                >
                    <HStack spacing={4}>
                        {isMobile && (
                            <IconButton
                                aria-label="Menu"
                                icon={<FaBars />}
                                variant="ghost"
                                onClick={onOpen}
                            />
                        )}
                        <Text fontSize="xl" fontWeight="bold" color="brand.500">
                            WIKICHAT
                        </Text>
                    </HStack>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<Avatar size="sm" name="User" />}
                            variant="ghost"
                            aria-label="User menu"
                        />
                        <MenuList bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
                            <MenuItem
                                icon={<FaCog />}
                                color={colorMode === 'dark' ? 'white' : 'black'}
                            >
                                Settings
                            </MenuItem>
                            <MenuItem
                                icon={<FaQuestionCircle />}
                                color={colorMode === 'dark' ? 'white' : 'black'}
                            >
                                Help & FAQ
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                icon={<FaSignOutAlt />}
                                color={colorMode === 'dark' ? 'white' : 'black'}
                            >
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                {/* Messages Area */}
                <Box
                    flex={1}
                    overflowY="auto"
                    p={4}
                    bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: colorMode === 'dark' ? 'gray.600' : 'gray.300',
                            borderRadius: '24px',
                        },
                    }}
                >
                    <Flex direction="column" gap={4}>
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={message.content}
                                isUser={message.isUser}
                                timestamp={message.timestamp}
                            />
                        ))}
                        {isLoading && (
                            <ChatMessage
                                message=""
                                isUser={false}
                                isTyping={true}
                            />
                        )}
                        <div ref={messagesEndRef} />
                    </Flex>
                </Box>

                {/* Input Area */}
                <Box
                    p={4}
                    bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                    borderTop="1px"
                    borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                >
                    <Flex gap={4}>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            color={colorMode === 'dark' ? 'white' : 'black'}
                            _placeholder={{ color: colorMode === 'dark' ? 'gray.400' : 'gray.200' }}
                            border="none"
                            _focus={{
                                border: '1px solid',
                                borderColor: 'brand.500',
                            }}
                            disabled={isLoading}
                            size="lg"
                        />
                        <IconButton
                            aria-label="Send message"
                            icon={<FaPaperPlane />}
                            onClick={handleSend}
                            isLoading={isLoading}
                            colorScheme="brand"
                            size="lg"
                        />
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};

export default ChatInterface; 