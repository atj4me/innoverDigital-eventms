import { Skeleton, Table } from "@chakra-ui/react";
import React from "react";

const TableSkeleton = (columns = 5, rows = 10 ) => {
    return (
            <Table.Body>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <Table.Row key={rowIndex}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Table.Cell key={colIndex}>
                                <Skeleton height="20px" />
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
    );
};

export default TableSkeleton;
