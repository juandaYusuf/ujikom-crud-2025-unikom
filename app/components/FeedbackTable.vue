<template>
  <UTable
    :data="data"
    :columns="columns"
    v-model:column-visibility="columnVisibility"
    class="flex-1 border border-gray-300 bg-gray-100/40 rounded-xl shadow"
  />
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  dataSource: Record<string, unknown>[] | undefined;
  isLoading: boolean;
}>();
const emit = defineEmits(["deleteFeedback", "click:editFeedback"]);

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const toast = useToast();
const { copy } = useClipboard();

type TFeedback = {
  number: number;
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const data = computed(() => props.dataSource as TFeedback[]);
const isDeletingFeedback = ref(false);
const feedbackIdToDelete = ref();
const columnVisibility = ref({
  id: false,
});

const columns: TableColumn<TFeedback>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "number",
    header: "#",
    cell: ({ row }) => `${row.getValue("number")}`,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "message",
    header: "Pesan",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleString("id-ID"),
  },
  {
    accessorKey: "updatedAt",
    header: "Diperbarui",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt")).toLocaleString(
        "id-ID"
      );
      const updatedAt = new Date(row.getValue("updatedAt")).toLocaleString(
        "id-ID"
      );
      console.log(createdAt, updatedAt);
      if (createdAt === updatedAt) {
        return "Belum ada pembaruan";
      } else {
        return new Date(row.getValue("updatedAt")).toLocaleString("id-ID");
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-2" }, [
        h(UButton, {
          icon: "lucide:trash-2",
          variant: "soft",
          class: "border border-primary",
          size: "sm",
          disabled: isDeletingFeedback.value,
          loading:
            isDeletingFeedback.value &&
            feedbackIdToDelete.value === row.getValue("id"),
          onClick: () => {
            deleteFeedback(row.getValue("id"));
          },
        }),
        h(UButton, {
          icon: "lucide:pen",
          variant: "soft",
          class: "border border-primary",
          size: "sm",
          onClick: () => {
            emit("click:editFeedback", row.original);
          },
        }),
      ]);
    },
  },
];

const deleteFeedback = async (id: string) => {
  try {
    isDeletingFeedback.value = true;
    feedbackIdToDelete.value = id;
    const res = await $fetch(`/api/feedback`, {
      method: "DELETE",
      query: { id },
    });
    if (res.success) {
      toast.add({
        title: "Success",
        description: "Feedback has been deleted.",
        color: "primary",
      });
      emit("deleteFeedback", id);
    }
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Something went wrong.",
      color: "error",
    });
  } finally {
    isDeletingFeedback.value = false;
  }
};
</script>
