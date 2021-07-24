import { memo } from "react";

const JsonBlock = (data) => {
  return (
    <code>
      {JSON.stringify(data, null, 2)}
    </code>
  )
}

export default memo(JsonBlock);