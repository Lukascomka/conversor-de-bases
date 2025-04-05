document.addEventListener("DOMContentLoaded", function () {
    const converterBtn = document.getElementById("converterBtn");

    converterBtn.addEventListener("click", function () {
        let tipoEntrada = document.getElementById("tipoEntrada").value;
        let numeroInput = document.getElementById("numeroInput").value.trim();

        if (!numeroInput) {
            alert("Por favor, insira um número.");
            return;
        }

        let decimalValue;

        try {
            // Validação específica para cada tipo de entrada
            if (tipoEntrada === "bin" && !/^[01]+$/.test(numeroInput)) {
                throw new Error("Número binário inválido. Use apenas 0 e 1.");
            } else if (tipoEntrada === "dec" && !/^\d+$/.test(numeroInput)) {
                throw new Error("Número decimal inválido. Use apenas dígitos.");
            } else if (tipoEntrada === "hex" && !/^[0-9A-Fa-f]+$/.test(numeroInput)) {
                throw new Error("Número hexadecimal inválido. Use dígitos e letras de A a F.");
            } else if (tipoEntrada === "oct" && !/^[0-7]+$/.test(numeroInput)) {
                throw new Error("Número octal inválido. Use apenas dígitos de 0 a 7.");
            }

            // Converter para decimal baseado no tipo de entrada
            if (tipoEntrada === "bin") {
                decimalValue = parseInt(numeroInput, 2);
            } else if (tipoEntrada === "dec") {
                decimalValue = parseInt(numeroInput, 10);
            } else if (tipoEntrada === "hex") {
                decimalValue = parseInt(numeroInput, 16);
            } else if (tipoEntrada === "oct") {
                decimalValue = parseInt(numeroInput, 8);
            }

            // Se for um número muito grande, usar BigInt para evitar problemas
            if (!isFinite(decimalValue) || decimalValue > Number.MAX_SAFE_INTEGER) {
                throw new Error("O número é muito grande para conversão padrão.");
            }

            // Converter decimal para os outros formatos
            document.getElementById("binario").textContent = decimalValue.toString(2);
            document.getElementById("decimal").textContent = decimalValue.toString(10);
            document.getElementById("hexadecimal").textContent = decimalValue.toString(16).toUpperCase();
            document.getElementById("octal").textContent = decimalValue.toString(8);

        } catch (error) {
            alert("Erro: " + error.message);
        }
    });
});