"use client";
import DateFilter from "../components/searchFilters/DateFilter";
import { useEffect, useState } from "react";
import { getData } from "@/lib/api/httpClient";
import {
  getCurrentDate,
  formatUTCDateToLocal,
  getDayRangeUTC,
} from "@/lib/utils/date";
import TextFilter from "../components/searchFilters/TextFilter";
import { useRouter } from "next/navigation";

import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";

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

    // 현재 타임존 기준으로 선택된 날짜의 시작일과 종료일을 UTC로 변환
    const dayRange = getDayRangeUTC(serchCondition.date);
    url += `?startDate=${dayRange.start}`;
    url += `&endDate=${dayRange.end}`;
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
      <button
        className="bg-main absolute right-5 bottom-5 cursor-pointer rounded-full p-2 text-3xl text-white opacity-80 hover:opacity-100"
        onClick={() => goToDetail()}
      >
        <IoMdAdd />
      </button>
      <div className="flex h-full w-full flex-col gap-3 overflow-y-auto">
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
        </div>
        <div className="flex w-full flex-col gap-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => goToDetail(note.id)}
              className="cursor-pointer rounded-md bg-gray-100 p-2 hover:bg-gray-200"
            >
              <div className="text-lg font-bold">{note.title}</div>
              <div className="text-s text-gray-600">{note.content}</div>
              <div className="text-xs text-gray-400">
                {formatUTCDateToLocal(note.createdAt ?? "")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
