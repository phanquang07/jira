import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectAction } from "../../redux/action/projectAction";
import { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AutoComplete, Button, Popover, Space, Table, Tag } from "antd";
import Avatar from "antd/es/avatar/avatar";

export default function ProjectManagement() {
  const projectList = useSelector((state) => state.projectReducer.projectList);
  const dispatch = useDispatch();
  useEffect(() => {
    getApiProjectManagement();
  }, []);

  const searchRef = useRef(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter, extra) => {
    // console.log("filters, sorter: ", pagination, filters, sorter, extra);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({
      filteredInfo: null,
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  // const content = (record, index) => {
  //   // console.log('record: ', record);
  //   return (
  //     <div>
  //       <AutoComplete
  //         value={usernameSearch}
  //         onChange={(value) => {
  //           setUsernameSearch(value);
  //         }}
  //         options={
  //           // usersSearched?.map((user, index) => {
  //           //     return { label: user.login, value: user.id, key: index }
  //           // })

  //           usersSearched
  //             ?.filter((user) => {
  //               let index = record.members.findIndex(
  //                 (member) => member.userId === user.userId
  //               );
  //               if (index !== -1) {
  //                 return false;
  //               }
  //               return true;
  //             })
  //             .map((user, index) => {
  //               return { label: user.login, value: user.userId, key: index };
  //             })
  //         }
  //         style={{ width: "100%" }}
  //         onSelect={(value, option) => {
  //           setUsernameSearch(option.label);
  //           dispatch({
  //             type: ADD_MEMBER_TO_PROJECT_SAGA,
  //             project: {
  //               ...record,
  //               members: [...record.members, { id: value }],
  //             },
  //           });
  //         }}
  //         onSearch={(value) => {
  //           if (searchRef.current) {
  //             clearTimeout(searchRef.current);
  //           }
  //           searchRef.current = setTimeout(() => {
  //             dispatch({
  //               type: SEARCH_USER_SAGA,
  //               username: value,
  //             });
  //           }, 300);
  //         }}
  //         placeholder="Username"
  //       />
  //     </div>
  //   );
  // };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  // console.log("projectList: ", projectList);
  let dataListProject = projectList.map((item) => {
    // console.log("item: ", item);
    return {
      ...item,
      projectCategoryName: item.projectCategoryName,
    };
  });

  // console.log(item.creatorName);
  // console.log(dataListProject.projectName);

  const getApiProjectManagement = () => {
    const action = getAllProjectAction();
    dispatch(action);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record) => {
        return (
          <NavLink to={`/board/${record.id}`} style={{ cursor: "pointer" }}>
            {text}
          </NavLink>
        );
      },
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      filters: [
        { text: "Dự án web", value: "Dự án web" },
        { text: "Dự án phần mềm", value: "Dự án phần mềm" },
        { text: "Dự án di động", value: "Dự án di động" },
      ],
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortOrder: sortedInfo.columnKey === "categoryName" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      sorter: (a, b) => a.creator.name.length - b.creator.name.length,
      sortOrder: sortedInfo.columnKey === "creator" && sortedInfo.order,
      ellipsis: true,
      render: (text, record) => {
        // console.log("record: ", record);
        return record.creator.name === "admin" ? (
          <Tag color="#f50" key={record.creator.id}>
            {record.creator.name}
          </Tag>
        ) : record.creator.name === "members" ? (
          <Tag color="#108ee9" key={record.creator.id}>
            {record.creator.name}
          </Tag>
        ) : (
          <Tag color="#1ca027" key={record.creator.id}>
            {record.creator.name}
          </Tag>
        );
      },
    },
    // {
    //   title: "Members",
    //   dataIndex: "member",
    //   key: "member",
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         <Avatar.Group
    //           maxCount={2}
    //           maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
    //           key={index}
    //         >
    //           {record.members.map((member) => {
    //             console.log("member: ", member);
    //             return member.avatar === "" || member.avatar === null ? (
    //               <Avatar key={member.userId}>
    //                 {member.login.charAt(0).toUpperCase()}
    //               </Avatar>
    //             ) : (
    //               <Avatar src={member.avatar} key={member.userId} />
    //             );
    //           })}
    //         </Avatar.Group>
    //         <Popover
    //           placement="topLeft"
    //           title={"Add Member"}
    //           // content={content(record, index)}
    //           trigger="click"
    //         >
    //           <Button
    //             type="primary"
    //             size="small"
    //             style={{ fontWeight: "bold", fontSize: 15 }}
    //           >
    //             +
    //           </Button>
    //         </Popover>

    //         <Popover
    //           placement="topLeft"
    //           title={"Members"}
    //           content={() => {
    //             return (
    //               <table className="table">
    //                 <thead>
    //                   <tr>
    //                     <th>ID</th>
    //                     <th>Avatar</th>
    //                     <th>Account</th>
    //                     <th>Action</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   {record.members?.map((member) => {
    //                     return (
    //                       <tr key={member.userId}>
    //                         <th>{member.userId}</th>
    //                         <td>
    //                           {member.avatar === "" ||
    //                           member.avatar === null ? (
    //                             <Avatar key={member.id}>
    //                               {member.login.charAt(0).toUpperCase()}
    //                             </Avatar>
    //                           ) : (
    //                             <Avatar
    //                               src={member.avatar}
    //                               key={member.userId}
    //                             />
    //                           )}
    //                         </td>
    //                         <td>{member.login}</td>
    //                         <td>
    //                           <Button
    //                             className="ml-1"
    //                             type="danger"
    //                             size="small"
    //                             style={{ fontWeight: "bold", fontSize: 15 }}
    //                             onClick={() => {
    //                               dispatch({
    //                                 type: DELETE_MEMBER_FROM_PROJECT_SAGA,
    //                                 project: {
    //                                   ...record,
    //                                   members: record.members.filter(
    //                                     (item) => item.id !== member.id
    //                                   ),
    //                                 },
    //                               });
    //                             }}
    //                           >
    //                             X
    //                           </Button>
    //                         </td>
    //                       </tr>
    //                     );
    //                   })}
    //                 </tbody>
    //               </table>
    //             );
    //           }}
    //           trigger="click"
    //         >
    //           <Button
    //             className="ml-1"
    //             type="danger"
    //             size="small"
    //             style={{ fontWeight: "bold", fontSize: 15 }}
    //           >
    //             X
    //           </Button>
    //         </Popover>
    //       </>
    //     );
    //   },
    // },
    {
      title: "Action",
      dataIndex: "",
      key: "id",
      // render: (text, record, index) => (
      //   <div style={{ display: "flex" }}>
      //     <div>
      //       <span
      //         style={{ cursor: "pointer" }}
      //         key={index}
      //         onClick={() => {
      //           showModalViewProject(record.id);
      //         }}
      //       >
      //         <EyeOutlined style={{ fontSize: 18 }} />
      //       </span>
      //     </div>
      //     <div>
      //       <span
      //         className="bg-primary text-white ml-3"
      //         style={{
      //           padding: 6,
      //           borderRadius: "3px",
      //           paddingBottom: 8,
      //           cursor: "pointer",
      //         }}
      //         onClick={() => {
      //           showEditProjectDrawer(record.id);
      //         }}
      //       >
      //         <FormOutlined style={{ fontSize: 18 }} />
      //       </span>
      //     </div>
      //     <div>
      //       <span>
      //         <Popconfirm
      //           title="Are you sure to delete this project?"
      //           onConfirm={() => {
      //             dispatch({
      //               type: DELETE_PORJECT_SAGA,
      //               id: record.id,
      //               Creator: record.Creator,
      //             });
      //           }}
      //           okText="Yes"
      //           cancelText="No"
      //         >
      //           <span
      //             className="bg-danger text-white ml-2"
      //             style={{
      //               padding: 6,
      //               borderRadius: "3px",
      //               paddingBottom: 8,
      //               cursor: "pointer",
      //             }}
      //           >
      //             <DeleteOutlined style={{ fontSize: 18 }} />
      //           </span>
      //         </Popconfirm>
      //       </span>
      //     </div>
      //   </div>
      // ),
    },
  ];

  return (
    <div className="mt-5">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Space>
          <NavLink to="/Project/createProject">
            <button className="btn btn-success btn-sm" type="button">
              <i className="fa fa-plus"></i>
              <span style={{ marginLeft: 4 }}>Create New Project</span>
            </button>
          </NavLink>
        </Space>
      </div>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={dataListProject}
        onChange={handleChange}
      />
      {/* {console.log("dataListProject", dataListProject)} */}
    </div>
  );
}
