"use client";
import DateFilter from "../components/searchFilters/DateFilter";
import { useEffect, useState } from "react";
import { getData } from "@/lib/api/httpClient";
import { getCurrentDate, formatUTCDateToLocal } from "@/lib/utils/date";
import TextFilter from "../components/searchFilters/TextFilter";
import { useRouter } from "next/navigation";

interface SearchCondition {
  date: string;
  title: string;
}

interface Note {
  id: number;
  userId?: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isDeleted?: boolean;
}

export default function Notes() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [serchCondition, setSerchCondition] = useState<SearchCondition>({
    date: getCurrentDate(),
    title: "",
  });

  const fetchNotes = async () => {
    let url = "/notes";
    url += `?date=${new Date(serchCondition.date).toISOString()}`;
    url += `&title=${serchCondition.title}`;
    const res = await getData<Note[]>(url);
    setNotes(res);
  };

  // 검색 조건이 변경되면 노트 목록 다시 불러오기
  useEffect(() => {
    fetchNotes();
  }, [serchCondition.date]);

  // 타이틀 검색이 변경되면, 내부 리스트에서 filter를 수행한다.
  useEffect(() => {
    if (serchCondition.title === "") {
      setFilteredNotes(notes);
      return;
    }

    const filteredNotes = notes.filter((note) =>
      note.title.includes(serchCondition.title),
    );
    setFilteredNotes(filteredNotes);
  }, [serchCondition.title, notes]);

  const goToDetail = (id?: number | null) => {
    let url = `/notes/detail`;

    if (id) {
      url += `?id=${id}`;
    }

    router.push(url);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <DateFilter<SearchCondition>
          serchCondition={serchCondition}
          setSerchCondition={setSerchCondition}
        />
        <TextFilter<SearchCondition>
          filterKey="title"
          serchCondition={serchCondition}
          setSerchCondition={setSerchCondition}
        />
        <button
          className="bg-main rounded-md p-2 text-white"
          onClick={() => goToDetail()}
        >
          new
        </button>
      </div>
      <div className="flex h-full w-full flex-col gap-3">
        {filteredNotes.map((note) => (
          <div key={note.id} onClick={() => goToDetail(note.id)}>
            <div>{note.title}</div>
            <div>{note.content}</div>
            <div>{formatUTCDateToLocal(note.createdAt ?? "")}</div>
          </div>
        ))}
      </div>
    </>
  );
}
