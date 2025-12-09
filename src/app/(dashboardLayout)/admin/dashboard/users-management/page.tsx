
import UsersManagementHeader from "@/components/modules/admin/userManagement/UserManagementHeaders";
import UsersTable from "@/components/modules/admin/userManagement/UsersTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getUsers } from "@/server/admin/userManagement.server";
import { queryStringFormatter } from "@/utils/formatters";
import { Suspense } from "react";

const AdminUsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); 
  const usersResult = await getUsers(queryString);
  const totalPages = Math.ceil(
    usersResult.meta.total / usersResult.meta.limit
  );
  return (
    <div className="space-y-6">
      <UsersManagementHeader/>
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
        {/* <SelectFilter
          paramName="speciality" // ?speciality="Cardiology"
          options={specialitiesResult.data.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.title,
          }))}
          placeholder="Filter by speciality"
        /> */} 
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UsersTable
          users={usersResult.data}
        />
        <TablePagination
          currentPage={usersResult.meta.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;
