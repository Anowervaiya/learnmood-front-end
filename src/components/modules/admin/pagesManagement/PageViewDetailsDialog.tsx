import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPage } from "@/interfaces/page.interface";
import {
  Mail,
} from "lucide-react";


interface IpageViewDialogProps {
  open: boolean;
  onClose: () => void;
  page: IPage | null;
}

const PageViewDetailDialog = ({
  open,
  onClose,
  page,
}: IpageViewDialogProps) => {
  if (!page) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>page Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* page Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={page?.image?.profile} alt={page?.name} />
              <AvatarFallback className="text-2xl">
                {page?.name}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{page?.name}</h2>
              <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {page?.owner?.email || "No email provided"}
              </p>
              

            </div>
          </div>

        
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default PageViewDetailDialog;
