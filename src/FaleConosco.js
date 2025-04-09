import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function OuvidoriaDeTeste() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [envios, setEnvios] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_70qhemt", "template_r2zfuxj", form, "L-5ExBufX2oZqn4fA")
      .then(() => {
        alert("Email enviado com sucesso!");
        setEnvios([...envios, form]); // Salva o envio
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => console.error("Erro ao enviar:", error));
  };

  const gerarRelatorio = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Relatório de Ouvidoria</title><style>");
    printWindow.document.write("body { font-family: Arial, sans-serif; padding: 20px; } h2 { color: #333; }");
    printWindow.document.write("p { margin: 5px 0; } hr { margin: 15px 0; }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write("<h2>Relatório de Ouvidoria</h2>");
    envios.forEach((envio, index) => {
      printWindow.document.write(`<p><strong>${index + 1}. Nome:</strong> ${envio.name}</p>`);
      printWindow.document.write(`<p><strong>Email:</strong> ${envio.email}</p>`);
      printWindow.document.write(`<p><strong>Mensagem:</strong> ${envio.message}</p>`);
      printWindow.document.write("<hr>");
    });
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Ouvidoria de Teste</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} type="text" name="name" placeholder="Seu Nome" value={form.name} onChange={handleChange} required />
        <input style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} type="email" name="email" placeholder="Seu Email" value={form.email} onChange={handleChange} required />
        <textarea style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", resize: "none", height: "100px" }} name="message" placeholder="Sua Mensagem" value={form.message} onChange={handleChange} required />
        <button style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }} type="submit">Enviar</button>
      </form>
      {envios.length > 0 && (
        <button onClick={gerarRelatorio} style={{ marginTop: "10px", padding: "10px", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>
          Gerar Relatório
        </button>
      )}
    </div>
  );
}
