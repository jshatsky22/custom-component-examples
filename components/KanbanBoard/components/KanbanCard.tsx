import React, { useCallback, useState } from "react";
import { Props } from "../types";
import styles from "../kanbanboard.module.css";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Avatar,
} from "@mantine/core";

interface KanbanCardProps {
  title: string;
  description: string;
  id: number;
  columnIndex: number;
  cardIndex: number;
  updateProperties: (props: Partial<Props>) => void;
  onCardEdit: () => void;
}

export default function KanbanCard({
  title,
  description, // changeCard,
  id,
  cardIndex,
  columnIndex,
  updateProperties,
  onCardEdit,
}: KanbanCardProps) {
  const editCard = useCallback(() => {
    // console.log("THE CARD INDEX IS ", cardIndex);
    // console.log("THE COLUMN INDEX IS ", columnIndex);
    updateProperties({ cardToEdit: cardIndex, columnToEdit: columnIndex });
    onCardEdit();
  }, [cardIndex, updateProperties]);

  return (
    <div onClick={editCard} className={styles.kanbanCard}>
      <Group position="apart" mb="xs">
        <Title order={4} color="gray.3">
          {title}
        </Title>
        <Avatar radius="xl" size="sm"></Avatar>
      </Group>
      <Text size="sm" color="dimmed">
        {description}
      </Text>
    </div>
  );
}
