import { useWeather } from "../hooks/useWeather";
import { useNavigate } from "react-router-dom";

export function Result() {
  const { weather, getDayOfWeek } = useWeather();
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Resultado da sua viagem 🌍
      </h1>

      {/* 🌦️ Clima */}
      <div className="mb-10">
        {/*Seção com as informaçoes do clima dos dias que foi escolhido pelo usuario*/}
        {weather && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-zinc-600 rounded-lg shadow-lg shadow-black/80 border border-white/5 p-10 w-full">
            {weather.dates.map((day, index) => (
              <div
                key={day}
                className="bg-zinc-700 hover:bg-zinc-600  transition-all duration-300 rounded-xl p-5 shadow-md hover:shadow-xl flex flex-col gap-3">
                <p>
                  📅 {getDayOfWeek(day)} ({day})
                </p>
                <p>
                  🔥 Máxima: {weather.temperature_2m_max[index]} ❄️ Mínima:{" "}
                  {weather.temperature_2m_min[index]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🤖 IA (placeholder por enquanto) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Sugestão de roteiro 🤖</h2>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <p className="text-zinc-300">
            Em breve você verá aqui um roteiro gerado por IA com base no seu
            destino e nas datas da viagem.
          </p>
        </div>
      </div>

      {/* 🔙 voltar */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-lime-400 hover:bg-lime-300 px-6 py-3 rounded-lg text-zinc-900 font-semibold">
          Nova viagem
        </button>
      </div>
    </section>
  );
}
