import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useEditRole = () => {
  const [role, setRole] = useState(true);
  const [appId, setAppId] = useState(localStorage.getItem("ACIid"));
  const { id } = useParams()

  useEffect(() => {
    let isEdit = localStorage.getItem("role");
    
    if (parseInt(isEdit) === 1) {
      setRole(false);
    } else {
      setRole(true);
    }
  }, []);

  return [role, appId];
};

export default useEditRole;
