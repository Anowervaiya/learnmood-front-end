"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { IUser } from "@/interfaces/user.interface";
import { softDeleteUser } from "@/server/admin/userManagement.server";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { usersColumns } from "./UsersColumns";
import DoctorViewDetailDialog from "./UserViewDetailsDialog";

interface UsersTableProps {
  users: IUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingUser._id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete doctor");
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={usersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(user) => user._id!}
        emptyMessage="No users found"
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

      {/* View Doctor Detail Dialog */}
      <DoctorViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UsersTable;
