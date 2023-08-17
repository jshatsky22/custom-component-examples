import { type ComponentConfig } from "@superblocksteam/custom-components";

export default {
  // DO NOT CHANGE THE ID ONCE THE COMPONENT HAS BEEN REGISTERED!
  id: "34e2acad-ff75-4497-9832-bd035616e577",
  name: "KanbanBoard",
  displayName: "Kanban Board",
  componentPath: "components/KanbanBoard/component.tsx",
  properties: [
    {
      path: "board",
      dataType: "any",
      propertiesPanelDisplay: {
        label: "Default Board JSON",
        controlType: "js-expr",
      },
    },
    {
      path: "allowAddColumn",
      dataType: "string",
      propertiesPanelDisplay: {
        label: "Allow Add Column",
        controlType: "switch",
      },
    },
    {
      path: "columnToEdit",
      dataType: "number",
    },
    {
      path: "cardToEdit",
      dataType: "number",
    },
  ],
  events: [
    {
      label: "On Card Dropped",
      path: "onCardDrop",
    },
    {
      label: "On Column Dropped",
      path: "onColumnDrop",
    },
    {
      label: "On Column Add",
      path: "onColumnAdd",
    },
    {
      label: "On Card Edit",
      path: "onCardEdit",
    },
    {
      label: "On Column Title Edit",
      path: "onColumnTitleEdit",
    },
    {
      label: "On Card Add",
      path: "onCardAdd",
    },
  ],
} satisfies ComponentConfig;
