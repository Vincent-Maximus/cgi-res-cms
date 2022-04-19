import React, { useEffect, useState } from "react";
import { PeripheralType } from "./PeripheralTypeEntity";

function PeripheralTypeOverview() {
  const [data, setData] = useState<PeripheralType[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () =>
    fetch("http://localhost:3001/peripheral/category", {
      method: "GET",
      mode: "cors",
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });

  const deletePeripheralType = (id: number) =>
    fetch(`http://localhost:3001/peripheral/category/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((result) => result.json())
      .then(() => {
        refresh();
      });

  return (
    <div className="border border-gray-200 rounded-xl m-8 bg-white">
      <div className="px-4">
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="py-4 font-bold text-xl">Peripheral Categories</h1>
            <div className="my-auto">
              <a
                className="bg-slate-100 rounded px-4 py-2"
                href="/peripherals/categories/new"
              >
                + Add new Peripheral Category
              </a>
            </div>
          </div>
          <hr />
        </div>

        <div className="my-4">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="rounded-lg font-bold text-gray-700 text-left">
                <th className="px-4 py-2 bg-slate-200 rounded-l-lg">Title</th>
                <th className="px-4 py-2 bg-slate-200 rounded-r-lg"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal text-gray-700">
              {data.map((pt: PeripheralType) => (
                <tr className="hover:bg-gray-100 border-b border-gray-200">
                  <td className="px-4 py-2 font-bold">{pt.title}</td>
                  <td className="px-4 py-2 text-right space-x-4">
                    <a
                      className="text-yellow-500"
                      href={`/peripherals/categories/${pt.id}`}
                    >
                      Edit
                    </a>
                    <button
                      className="text-red-500"
                      onClick={() => deletePeripheralType(pt.id ? pt.id : 1)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PeripheralTypeOverview;
