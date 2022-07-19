import logo from "./logo.svg";
import "./App.css";
import AddUser from "./components/AddUser";

import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { useDispatch, useSelector } from "react-redux";
import "react-data-table-component-extensions/dist/index.css";
import { useState } from "react";
import { removeUser } from "./components/redux/AdduserSlice";
import { ToastContainer } from "react-toastify";
function App() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.users);
  const [editId, setShowEdit] = useState(null);
  const columns = [
    {
      name: "Username",
      shortable: true,
      selector: (row) => row.userName,
    },
    {
      name: "Full Name",
      shortable: true,
      selector: (row) => row.fullName,
    },
    {
      name: "Edit",
      shortable: true,
      selector: (row) => row.id,
      cell: ({ id }) => {
        return (
          <div>
            <button onClick={() => setShowEdit(id)}>Edit</button>
          </div>
        );
      },
    },
    {
      name: "Delete",
      shortable: true,
      selector: (row) => row.id,
      cell: ({ id, userRole }) => {
        return (
          <div>
            <button
              className={`px-6 py-2  ${
                userRole === "admin"
                  ? "bg-red-600 cursor-pointer "
                  : "bg-rose-300  "
              }`}
              disabled={userRole === "admin" ? false : true}
              onClick={() => dispatch(removeUser(id))}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const table = {
    data: userList,
    columns,
  };
  return (
    <>
      <div className="App">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AddUser editId={editId} setShowEdit={setShowEdit} />
        <div className="lists -z-0 max-w-screen-xl mt-8 mx-auto">
          <DataTableExtensions {...table}>
            <DataTable noHeader defaultSortFieldId={"id"} />
          </DataTableExtensions>
        </div>
      </div>
    </>
  );
}

export default App;
