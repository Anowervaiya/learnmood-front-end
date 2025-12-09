"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/interfaces/user.interface";
import { softDeleteUser } from "@/server/admin/userManagement.server";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import DoctorViewDetailDialog from "./PageViewDetailsDialog";
import { IPage } from "@/interfaces/page.interface";
import { pagesColumns } from "./PagesColumns";
import PageViewDetailDialog from "./PageViewDetailsDialog";

interface PagesTableProps {
  pages: IPage[];
}

const PagesTable = ({ pages }: PagesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingPage, setDeletingPage] = useState<IPage | null>(null);
  const [viewingPage, setViewingPage] = useState<IPage | null>(null);
  const [editingPage, setEditingPage] = useState<IPage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (page: IPage) => {
    setViewingPage(page);
  };

  const handleEdit = (page: IPage) => {
    setEditingPage(page);
  };

  const handleDelete = (page: IPage) => {
    setDeletingPage(page);
  };

  const confirmDelete = async () => {
    if (!deletingPage) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingPage._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingPage(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={pages}
        columns={pagesColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(page) => page._id!}
        emptyMessage="No pages found"
      />
      {/* Edit Doctor Form Dialog */}
      {/* <DoctorFormDialog
        open={!!editingDoctor}
        onClose={() => setEditingDoctor(null)}
        doctor={editingDoctor!}
        specialities={specialities}
        onSuccess={() => {
          setEditingDoctor(null);
          handleRefresh();
        }}
      /> */}

      {/* View Page Detail Dialog */}
      <PageViewDetailDialog
        open={!!viewingPage}
        onClose={() => setViewingPage(null)}
        page={viewingPage}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPage}
        onOpenChange={(open) => !open && setDeletingPage(null)}
        onConfirm={confirmDelete}
        title="Delete Page"
        description={`Are you sure you want to delete ${deletingPage?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PagesTable;
