import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "./redux/AdduserSlice";

const AddUser = ({ editId, setShowEdit }) => {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.users);
  const [showModel, setShowModel] = useState(false);
  const [formData, setFromData] = useState({
    fullName: "",
    userName: "",
    userRole: "admin",
  });


  useEffect(() => {
    if (editId) {
      const user = userList.find((user) => user.id === editId);
      setFromData(user);
    }
  }, [editId]);


  const submit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateUser(formData));

    } else {
      dispatch(addUser(formData));
    }
    setFromData({
      fullName: "",
      userName: "",
    });
    setShowModel(false);
    setShowEdit(null);
  };

  /**
   *
   * @param {inputValue} e
   */
  const updateChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const { fullName, userName, userRole } = formData;

  return (
    <div className="w-full h-full relative">
      <div className="max-w-screen-md mx-auto mt-16">
        <button
          onClick={() => setShowModel(!showModel)}
          className="bg-blue-500 rounded  px-5 py-2 text-gray-50"
        >
          Add User
        </button>
        {/* model */}
        <div
          className={`fixed top-0 left-0 z-50  w-full h-full justify-center mx-auto px-16   pt-8 bg-[#0000004f]  ${
            showModel || editId ? "block " : "hidden "
          }`}
        >
          <div
            className={`max-w-xl z-50 mx-auto border mt-32 p-4 bg-white shadow-lg rounded-md`}
          >
            <div
              onClick={() => {
                setShowModel(!showModel);
                setShowEdit(null);
              }}
              className="justify-end text-right text-2xl cursor-pointer"
            >
              x
            </div>
            <form className="" onSubmit={submit}>
              <div>
                <label>Name</label>
                <input
                  className="border border-gray-300 bg-gray-100 focus:bg-white w-full p-2 rounded-md "
                  type="text"
                  onChange={(e) => updateChange(e)}
                  name="fullName"
                  value={fullName}
                  required
                />
              </div>
              <div className="mt-2">
                <label>User Name</label>
                <input
                  className="border border-gray-300 bg-gray-100 focus:bg-white w-full p-2 rounded-md "
                  type="text"
                  onChange={(e) => updateChange(e)}
                  value={userName}
                  name="userName"
                  required
                />
              </div>
              <div className="mt-2">
                <label>userRole</label>
                <div class="mb-3 xl:w-96">
                  <select
                    className="form-select appearance-none  block w-full px-3  py-1.5 text-base border-2"
                    aria-label="Default select example"
                    type="text"
                    onChange={(e) => updateChange(e)}
                    value={userRole}
                    name="userRole"
                    required
                  >

                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-gray-50 mt-4 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
