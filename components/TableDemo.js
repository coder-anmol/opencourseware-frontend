import {
    Table,
    Thead,
    Tbody,
    Box,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Icon,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Link from "next/link";

const TableDemo = () => {
    return (
        <Box>
            <Heading size={"xl"} mb={"2"}>
                Edit Home
            </Heading>
            <TableContainer
                border={"1px"}
                borderColor={"gray.200"}
                rounded={"xl"}
            >
                <Table variant="striped" size={{ base: "md", md: "lg" }}>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th>into</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td>millimetres (mm)</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>
                                <Box
                                    display={"flex"}
                                    justifyContent={"end"}
                                    alignItems={"center"}
                                    gap={"3"}
                                >
                                    <Link href={"/"}>
                                        <Icon
                                            fontSize={"2xl"}
                                            cursor={"pointer"}
                                            color={"warning"}
                                            as={HiPencilAlt}
                                        />
                                    </Link>
                                    <Link href={"/"}>
                                        <Icon
                                            fontSize={"2xl"}
                                            cursor={"pointer"}
                                            color={"danger"}
                                            as={HiTrash}
                                        />
                                    </Link>
                                </Box>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td>centimetres (cm)</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                </Table>
                <Box py={"3"}>
                    <Pagination />
                </Box>
            </TableContainer>
        </Box>
    );
};

export default TableDemo;
