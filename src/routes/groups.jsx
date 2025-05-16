import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Container from "../components/Container";
import searchIcon from "/searchIcon.svg";
import { Link } from "@tanstack/react-router";
import GroupItem from "../components/GroupItem";

export const Route = createFileRoute("/groups")({
  component: Groups,
});

function Groups() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    getGroups();
  }, []);
  async function getGroups() {
    const response = await fetch(`http://127.0.0.1:8000/api/groups`, {
      method: "GET",
    });
    if (response.status === 200) {
      const result = await response.json();
      setGroups((items) => [...items, ...result]);
      setFilteredGroups((items) => [...items, ...result]);
    }
    console.log(response);
  }
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      searchGroups();
    }
  };
  function searchGroups() {
    const newGroups = groups.filter((group) =>
      group.group_name.toLowerCase().includes(searchString)
    );
    setFilteredGroups(newGroups);
  }
  function onSearchGroups(event) {
    setSearchString(event.target.value.toLowerCase());
  }
  return (
    <Container>
      <div className="flex justify-between items-center gap-5 mb-5">
        <div className="flex-1">
          <input
            onChange={onSearchGroups}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Поиск"
            className="bg-F6F3FC rounded-3xl p-2.5 text-sm font-light w-full border border-[#A987DF] focus:ring focus:ring-[#A987DF] outline-none"
          />
        </div>
        <button onClick={searchGroups}>
          <img
            src={searchIcon}
            className="cursor-pointer max-w-7"
            alt="Поиск"
          />
        </button>
      </div>
      <div className="grid-cols-2 md:grid-cols-4 grid gap-8 ">
        {filteredGroups?.length ? (
          filteredGroups.map((items) => (
            <GroupItem
              key={items.id}
              idGroup={items.id}
              name={items.group_name}
            />
          ))
        ) : (
          <div className="text-sm font-light">Группы не найдены</div>
        )}
      </div>
    </Container>
  );
}
