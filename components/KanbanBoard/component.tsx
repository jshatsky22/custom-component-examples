import React, { useCallback, useState } from "react";
import { useSuperblocksContext } from "@superblocksteam/custom-components";
import { type Props, type EventTriggers } from "./types";
import Board, {
  addCard,
  addColumn,
  moveCard,
  moveColumn,
  changeCard,
} from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import Modal from "react-modal";
import styles from "./kanbanboard.module.css";
import { render } from "react-dom";
import {
  DesktopOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import KanbanCard from "./components/KanbanCard";
import KanbanColumnTitle from "./components/KanbanColumnTitle";
import { findCardIndices, findColumnIndex } from "./utils/utils";
import { ActionIcon, Button } from "@mantine/core";
import "./kanbanboard-overrides.css";

export default function Component({ board, allowAddColumn }: Props) {
  const {
    updateProperties,
    events: {
      onCardDrop,
      onColumnDrop,
      onColumnAdd,
      onCardEdit,
      onColumnTitleEdit,
      onCardAdd,
    },
  } = useSuperblocksContext<Props, EventTriggers>();

  const onColumnMoved = useCallback(
    (column, source, destination) => {
      const newBoard = moveColumn(board, source, destination);
      updateProperties({ board: newBoard });
      onColumnDrop();
    },
    [board]
  );

  const onAddColumn = useCallback(
    (newColumn) => {
      onColumnAdd();
      // const newBoard = addColumn(board, newColumn);
      // updateProperties({ board: newBoard });
    },
    [board]
  );

  const handleCardDrop = useCallback(
    (card, from, to) => {
      onCardDrop();
      updateProperties({ board: moveCard(board, from, to) });
    },
    [onCardDrop, board]
  );

  console.log("THE DATA IS ", board);

  // const editCard = useCallback(
  //   (cardId: number, newTitle: string, newDescription: string) => {
  //     updateProperties({
  //       board: changeCard(board, cardId, {
  //         title: newTitle,
  //         description: newDescription,
  //       }),
  //     });
  //   },
  //   [board]
  // );

  if (!board || typeof board !== "object") {
    return null;
  }

  const renderCard = (content: any, bag: any) => {
    const indices = findCardIndices(content.id, board);
    return (
      <KanbanCard
        {...content}
        columnIndex={indices.columnIndex}
        cardIndex={indices.cardIndex}
        // editCard={editCard}
        updateProperties={updateProperties}
        onCardEdit={onCardEdit}
      />
    );
  };

  const renderColumnHeader = (column: any, bag: any) => {
    const index = findColumnIndex(column.id, board);
    // console.log("THE COLUMN INDEX IS ", index);
    console.log("THE COLUMN BEING RENDERED IS ", column);
    return (
      <KanbanColumnTitle
        {...column}
        updateProperties={updateProperties}
        onColumnTitleEdit={onColumnTitleEdit}
        columnIndex={index}
        board={board}
        onCardAdd={onCardAdd}
      />
    );
  };

  return (
    <div className={styles.kanbanBoard}>
      <div
        onMouseDown={(event) => {
          event.stopPropagation();
        }}>
        <Board
          children={board}
          onCardDragEnd={handleCardDrop}
          onColumnDragEnd={onColumnMoved}
          allowAddColumn={allowAddColumn}
          onColumnNew={onAddColumn}
          renderColumnAdder={() => (
            <div className={styles.addColumnIcon} onClick={onColumnAdd}>
              <PlusCircleOutlined style={{ color: "#dee2e6" }} />
            </div>
          )}
          renderCard={renderCard}
          renderColumnHeader={renderColumnHeader}
        />
      </div>
    </div>
  );
}
// return (
//   <div
//     style={{
//       height: "100%",
//       width: "100%",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#a7aebe",
//     }}>
//     <h1 style={{ color: "white" }}>{"<Insert Component Here>"}</h1>
//   </div>
// );
