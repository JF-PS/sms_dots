import toast from "react-hot-toast";

import axiosInstance from "./axios";

const fetchGQL = async (
  query,
  method = "post",
  params = {},
  successMessage = null
) => {
  let response = null;

  const headers = {
    "Content-Type": "application/json",
  };

  // Formulars creates null id when creation
  // So we delete here null ids
  if (params?.input?.id === null) {
    delete params.input.id;
  }

  // ID type is Int!
  if (params.input && "id" in params.input) {
    params.input.id = parseInt(params.input.id, 10);
  }

  try {
    window.location.protocol="http";
    response = await axiosInstance[method](
      "/graphql",
      {
        query,
        variables: params,
      },
      {
        headers,
      }
    );

    const res = JSON.parse(JSON.stringify(response.data));

    if (!res.data || res.errors) {
      throw res.error;
    }

    if (successMessage !== null) toast.success(successMessage);
    return res.data;

    // Case of error
  } catch (err) {
    console.error("fetchGQL NETWORK", err);
    toast.error("Oupsy - une erreur est survenue pendant l'action");
    return false;
  }
};

export default fetchGQL;
