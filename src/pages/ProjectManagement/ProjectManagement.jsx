import { Button, Popover, Space, Table } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectAction } from "../../redux/action/projecAction";
import Avatar from "antd/es/avatar/avatar";
import { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ProjectManagement() {
  const projectList = useSelector((state) => state.projectReducer.projectList);
  const dispatch = useDispatch();
  useEffect(() => {
    getApiProjectManagement();
  }, []);

  const searchRef = useRef(null);

  const [state, setState] = useState({
    filteredInfo: {},
    sortedInfo: {},
  });

  const handleChange = (pagination, filters, sorter, extra) => {
    console.log("filters, sorter: ", pagination, filters, sorter, extra);
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
      filteredInfo: {},
      sortedInfo: {},
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};

  // console.log("projectList: ", projectList);
  let dataConvert = projectList.map((item) => {
    console.log("item: ", item);
    return {
      ...item,
      projectCategoryName: item.projectCategoryName,
    };
  });

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
      sortOrder:
        state.sortedInfo.columnKey === "projectName" && sortedInfo.order,
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
      // filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      // sortOrder:
      //   sortedInfo.columnKey === "categoryName" && sortedInfo.order,
      // ellipsis: true,
    },
    {
      title: "Creator",
      dataIndex: "creator.name",
      key: "creator.name",
      // sorter: (a, b) => a.Creator.length - b.Creator.length,
      // sortOrder: sortedInfo.columnKey === "Creator" && sortedInfo.order,
      // ellipsis: true,
      // render: (text, record, index) => {
      //   return record.Creator === "ADMIN" ? (
      //     <Tag color="#f50" key={index}>
      //       {record.Creator}
      //     </Tag>
      //   ) : record.Creator === "Member" ? (
      //     <Tag color="#108ee9" key={index}>
      //       {record.Creator}
      //     </Tag>
      //   ) : (
      //     <Tag color="#1ca027" key={index}>
      //       {record.Creator}
      //     </Tag>
      //   );
      // },
    },
    {
      title: "Member",
      dataIndex: "members.name",
      key: "id",
      // render: (text, record, index) => {
      //   return (
      //     <>
      //       <Avatar.Group
      //         maxCount={2}
      //         maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      //         key={index}
      //       >
      //         {record.members.map((member, index) => {
      //           return member.imageUrl === "" || member.imageUrl === null ? (
      //             <Avatar key={index}>
      //               {member.login.charAt(0).toUpperCase()}
      //             </Avatar>
      //           ) : (
      //             <Avatar src={member.imageUrl} key={index} />
      //           );
      //         })}
      //       </Avatar.Group>
      //       <Popover
      //         placement="topLeft"
      //         title={"Add Member"}
      //         // content={content(record, index)}
      //         trigger="click"
      //       >
      //         <Button
      //           type="primary"
      //           size="small"
      //           style={{ fontWeight: "bold", fontSize: 15 }}
      //         >
      //           +
      //         </Button>
      //       </Popover>

      //       <Popover
      //         placement="topLeft"
      //         title={"Members"}
      //         content={() => {
      //           return (
      //             <table className="table">
      //               <thead>
      //                 <tr>
      //                   <th>ID</th>
      //                   <th>Avatar</th>
      //                   <th>Account</th>
      //                   <th>Action</th>
      //                 </tr>
      //               </thead>
      //               <tbody>
      //                 {record.members?.map((member) => {
      //                   return (
      //                     <tr key={index}>
      //                       <th>{member.id}</th>
      //                       <td>
      //                         {member.imageUrl === "" ||
      //                         member.imageUrl === null ? (
      //                           <Avatar key={member.id}>
      //                             {member.login.charAt(0).toUpperCase()}
      //                           </Avatar>
      //                         ) : (
      //                           <Avatar src={member.imageUrl} key={index} />
      //                         )}
      //                       </td>
      //                       <td>{member.login}</td>
      //                       <td>
      //                         <Button
      //                           className="ml-1"
      //                           type="danger"
      //                           size="small"
      //                           style={{ fontWeight: "bold", fontSize: 15 }}
      //                           onClick={() => {
      //                             dispatch({
      //                               type: DELETE_MEMBER_FROM_PROJECT_SAGA,
      //                               project: {
      //                                 ...record,
      //                                 members: record.members.filter(
      //                                   (item) => item.id !== member.id
      //                                 ),
      //                               },
      //                             });
      //                           }}
      //                         >
      //                           X
      //                         </Button>
      //                       </td>
      //                     </tr>
      //                   );
      //                 })}
      //               </tbody>
      //             </table>
      //           );
      //         }}
      //         trigger="click"
      //       >
      //         <Button
      //           className="ml-1"
      //           type="danger"
      //           size="small"
      //           style={{ fontWeight: "bold", fontSize: 15 }}
      //         >
      //           X
      //         </Button>
      //       </Popover>
      //     </>
      //   );
      // },
    },
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
        dataSource={dataConvert}
        onChange={handleChange}
      />
    </div>
  );
}
