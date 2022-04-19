import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../Components/TextInput";
import { Building } from "./BuildingEntity";

function BuildingEdit() {
  const { id } = useParams();

  const [building, setBuilding] = useState<Building>(new Building());

  const updateBuilding = (key: keyof Building, value: any) => {
    setBuilding({ ...building, [key]: value });
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/building/${id}`, {
        method: "GET",
        mode: "cors",
      })
        .then((result) => result.json())
        .then((data) => {
          console.log(data);
          setBuilding(data);
        });
    }
  }, []);

  const submit = () => {
    console.log(building);
    fetch(`http://localhost:3001/building/`, {
      method: id ? "PUT" : "POST",
      mode: "cors",
      body: JSON.stringify(building),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => updateBuilding("id", data.id));
  };

  return (
    <div className="border border-gray-200 rounded-xl m-8 bg-white">
      <div className="px-4">
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="py-4 font-bold text-xl">Building</h1>
            <div className="my-auto">
              <button
                className="bg-slate-100 rounded px-4 py-2"
                onClick={submit}
              >
                Save
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="p-4 flex flex-col space-y-4">
        <TextInput
          title="Title"
          placeholder="Building title..."
          value={building.title}
          onChange={(text) => updateBuilding("title", text)}
        />

        <TextInput
          title="Address"
          placeholder="Building address..."
          value={building.address}
          onChange={(text) => updateBuilding("address", text)}
        />
      </div>
    </div>
  );
}

export default BuildingEdit;
