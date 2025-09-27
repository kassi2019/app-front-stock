// globalComponents/Icons.js
import { FaEdit, FaTrash, FaEye, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { MdDeleteForever, MdAddCircle, MdModeEdit } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";

export const Icons = {
  edit:  <FaEdit className="me-1"/>,
  delete:  <FaTrash className="me-1" />,
  view:  <FaEye className="me-1"/>,
  add:  <FaPlus className="me-1"/>,
  save:  <FaSave className="me-1"/>,
  cancel:  <FaTimes className="me-1"/>,
  warning:  <AiFillWarning className="me-1"/>,
  info:  <BsInfoCircleFill className="me-1"/>,
  bigDelete:  <MdDeleteForever className="me-1"/>,
  bigEdit:  <MdModeEdit className="me-1"/>,
  bigAdd:  <MdAddCircle className="me-1"/>,
};
