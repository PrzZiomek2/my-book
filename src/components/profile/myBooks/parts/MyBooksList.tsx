import React, { FC, Suspense } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { CustomBook } from "@/types/interfaces";
import { ResultsList } from "@/components/commons/resultsList/ResultsList";
import CircularProgress from "@mui/material/CircularProgress";
import { urls } from "@/utils/urls";
import Box from "@mui/material/Box";

const { rootPath } = urls();

interface MyBooksListProps {
  flag: string;
}

export const MyBooksList: FC<MyBooksListProps> = ({ flag }) => {
  const { data: session } = useSession();
  const userId = session?.user.user._id;

  const { data } = useSWR<{ books: CustomBook[] }>(
    `${rootPath}/api/user-books/${userId}`
  );
  const books = data?.books?.filter((book) => book?.[flag]);

  return (
    <Suspense fallback={<CircularProgress />}>
      {books ? (
        <ResultsList results={books} noDescription />
      ) : (
        <Box sx={{ marginTop: "20px", fontSize: "1.2rem" }}>
          Nie masz jeszcze nic w kolekcji. Skorzystaj z sugestii, zajrzyj do
          rankingu albo użyj wyszkiwarki.
        </Box>
      )}
    </Suspense>
  );
};
