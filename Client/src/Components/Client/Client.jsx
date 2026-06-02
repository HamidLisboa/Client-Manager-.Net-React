import { useEffect, useState } from "react";
import ClientForm from "./ClientForm";
import ClientList from "./ClientList";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Client() {
  const BaseUrl = import.meta.env.VITE_BASE_API_URL + `/Clients`;
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultFormValues = {
    clientId: "",
    firstName: null,
    lastName: null,
    email: null,
    age: null,
    address: null,
    phone: null,
  };

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    try {
      const loadClients = async () => {
        var response = (await axios.get(BaseUrl)).data;
        setClients(response);
      };
      loadClients();
    } catch (error) {
      console.log(error);
      toast.error("Error has occured!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    methods.setValue("clientId", editData?.clientId);
    methods.setValue("firstName", editData?.firstName);
    methods.setValue("lastName", editData?.lastName);
    methods.setValue("email", editData?.email);
    methods.setValue("age", editData?.age);
    methods.setValue("address", editData?.address);
    methods.setValue("phone", editData?.phone);
    methods.setValue("accountNumber", editData?.accountNumber);
    methods.setValue("balance", editData?.balance);
  }, [editData]);

  const methods = useForm({
    defaultValues: defaultFormValues,
  });

  const handleFormReset = () => {
    methods.resetField("clientId");
    methods.resetField("firstName");
    methods.resetField("lastName");
    methods.resetField("email");
    methods.resetField("age");
    methods.resetField("address");
    methods.resetField("phone");
    methods.clearErrors();
  };

  const handleFormSubmit = async (client) => {
    setLoading(true);
    try {
      if (!client.clientId) {
        const createdClient = (await axios.post(BaseUrl, client)).data;
        setClients([createdClient]);
      } else {
        await axios.put(`${BaseUrl}/${client.clientId}`, client);
        setClients((previousClients) =>
          previousClients.map((p) =>
            p.clientId === client.clientId ? client : p,
          ),
        );
      }
      toast.success("Saved successfully!");
      methods.reset();
    } catch (error) {
      console.log(error);
      toast.error("Error has occured!");
    } finally {
      setLoading(false);
    }
  };

  const handleClientEdit = (client) => {
    console.log("Edit client:", client);
    setEditData(client);
  };

  const handleClientDelete = async (client) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to delete ${client.firstName} ${client.lastName}?`,
        )
      ) {
        await axios.delete(`${BaseUrl}/${client.clientId}`);
        setClients((prevClients) =>
          prevClients.filter((p) => p.clientId !== client.clientId),
        );
        toast.success("client deleted successfully!");
        console.log("Deleted client:", client);
        setLoading(true);
      } else {
        console.log("Delete cancelled for client:", client);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error(
        "An error occurred while trying to delete the client. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Client Management
          </h1>
          {loading && (
            <p className="mt-2 text-sm text-gray-500">Loading clients...</p>
          )}
        </div>

        <ClientForm
          methods={methods}
          onFormReset={handleFormReset}
          onFormSubmit={handleFormSubmit}
        />
        <ClientList
          clientsList={clients}
          onClientEdit={handleClientEdit}
          onClientDelete={handleClientDelete}
        />
      </div>
    </div>
  );
}

export default Client;
