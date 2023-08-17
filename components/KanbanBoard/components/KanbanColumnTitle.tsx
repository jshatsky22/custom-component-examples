import { useCallback, useState } from "react";
import { Props } from "../types";
import {
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "../kanbanboard.module.css";
import { changeColumn } from "@asseinfo/react-kanban";
import cloneDeep from "lodash/cloneDeep";
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Input,
  Title,
} from "@mantine/core";

interface KanbanColumnTitleProps {
  title: string;
  description: string;
  id: number;
  columnIndex: number;
  updateProperties: (props: Partial<Props>) => void;
  onColumnTitleEdit: () => void;
  onCardAdd: () => void;
  board: any;
}

export default function KanbanColumnTitle({
  title,
  id,
  columnIndex,
  updateProperties,
  onColumnTitleEdit,
  onCardAdd,
  board,
}: KanbanColumnTitleProps) {
  const editColumnName = useCallback(() => {
    // console.log("THE CARD INDEX IS ", cardIndex);
    // console.log("THE COLUMN INDEX IS ", columnIndex);
    updateProperties({ columnToEdit: columnIndex });
    onColumnTitleEdit();
  }, [columnIndex, updateProperties]);

  const [isEditable, setIsEditable] = useState(false);

  const [titleValue, setTitleValue] = useState(title);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Function to handle changes to the input field
  const handleTitleInputChange = (event: { target: { value: any } }) => {
    // console.log("THE VALUE IS ", event.target.value);
    setTitleValue(event.target.value);
  };

  // Function to handle when the user is done editing
  const handleInputBlur = () => {
    handleSave();
  };

  // Function to handle when the user presses Enter
  const handleInputKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  const handleCardAdd = () => {
    updateProperties({ columnToEdit: columnIndex });
    onCardAdd();
  };

  const handleSave = () => {
    const boardCopy = cloneDeep(board);
    // const boardCopy = { ...board };
    const newColumn = {
      ...boardCopy.columns[columnIndex],
      title: titleValue,
    };
    console.log("THE NEW COLUMN IS ", newColumn);
    console.log("THE COLUMN INDEX IS ", columnIndex);
    console.log("THE COLUMN TO UPDATE IS", boardCopy.columns[columnIndex]);
    boardCopy.columns[columnIndex] = newColumn;
    console.log("THE NEW BOARD IS ", boardCopy);
    updateProperties({ board: boardCopy });
    setIsEditable(false);

    // })
    // updateProperties( board: );
  };

  const editableHeader = (
    <Flex
      justify="space-between"
      align="flex-start"
      direction="row"
      wrap="wrap">
      <Input
        type="text"
        value={titleValue}
        onChange={handleTitleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyPress}
        autoFocus
      />
      <Button onClick={handleSave} color="dark.4">
        Save
      </Button>
    </Flex>
  );

  return (
    <div key={id} className={styles.titleContainer}>
      {isEditable ? (
        editableHeader
      ) : (
        <Flex justify="space-between" direction="row" align="center">
          <Flex
            gap="xs"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap">
            <div className={styles.titleText}>
              <Title order={2} color="gray.3">
                {title}
              </Title>{" "}
            </div>
            <div onClick={handleEditClick} className={styles.editTitle}>
              <EditOutlined style={{ color: "#dee2e6" }} />
            </div>
          </Flex>
          <div className={styles.addColumnIcon} onClick={handleCardAdd}>
            <PlusOutlined style={{ color: "#dee2e6" }} />
          </div>
        </Flex>
      )}
    </div>
  );
}
