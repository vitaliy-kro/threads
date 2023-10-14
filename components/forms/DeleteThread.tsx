'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteThread } from '@/lib/actions/thread.actions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  if (currentUserId !== authorId || pathname === '/') return null;

  const handleDelete = async () => {
    try {
      await deleteThread(JSON.parse(threadId), pathname);

      if (!parentId || !isComment) {
        router.push('/');
      }
      toast({
        title: 'Deleted',
        description: 'Your thread successfully deleted',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        action: (
          <ToastAction
            altText="Try again"
            onClick={async () => {
              await deleteThread(JSON.parse(threadId), pathname);
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image
          src="/assets/delete.svg"
          alt="delete"
          width={18}
          height={18}
          className="cursor-pointer object-contain"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-1">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-light-1">
            This action cannot be undone. This will permanently delete your post
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-primary-500">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteThread;
