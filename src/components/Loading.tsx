import React from "react";
import { List } from "react-content-loader";

import "../styles/components/loading.css";

export default function Loading() {
  return (
    <List
      backgroundColor={"#12AECB"}
      foregroundColor={"#17C0EB"}
      className="page-orphanage-loading"
    />
  );
}
