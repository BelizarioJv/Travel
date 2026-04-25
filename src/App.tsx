import { PlaneTakeoff, Calendar, MapPin, User } from "lucide-react";
import { useState } from "react";
import { useDestination } from "./hooks/useDestination";
import { useWeather } from "./hooks/useWeather";
import { useDateRange } from "./hooks/useDateRange";
import { Dialog } from "./components/Dialog";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { CalendarPicker } from "./components/Calendar";

function App() {
  const [guests, setGuests] = useState<string[]>([]);

  //Hooks criados para a aplicaçao
  const { query, setQuery, results, selectedDestination, selectDestination } =
    useDestination();
  const { weather, getWeatherData } = useWeather();
  const {
    startDateFormatted,
    endDateFormatted,
    showInviteEmail,
    handleCalendar,
    showDialog,
    disabledInput,
    handleShowInviteEmail,
    handleHideInviteEmail,
    disabledCalendar,
    handleShowDialog,
    showCalendar,
    setShowDialog,
  } = useDateRange();

  //Funçao para cuidar do submit do formulario
  const handleSubmit = () => {
    if (!selectedDestination) return;

    getWeatherData({
      latitude: selectedDestination.latitude,
      longitude: selectedDestination.longitude,
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    });
  };

  return (
    <>
      <main className="h-screen flex flex-col items-center justify-center gap-6 ">
        <form
          className="flex flex-col items-center bg-zinc-600 rounded-lg 
              shadow-lg shadow-black/80 border border-white/5 p-10"
          onSubmit={(e) => e.preventDefault()}>
          {/* Texto e logo */}
          <div className="flex min-w-xl items-center justify-center">
            <PlaneTakeoff size={82} color="#b6e372" />
            <p className="ml-5 text-5xl font-bold">Travel.com</p>
          </div>
          <p className="text-zinc-300 text-lg mt-10">
            Convide seus amigos para planejar a proxima viagem
          </p>

          {/* Inputs */}
          <div className="flex flex-col items-center gap-5 mt-5 bg-zinc-300 rounded-lg p-5 shadow-lg shadow-black/80">
            <div className="flex flex-col intem-center gap-5">
              <div className=" bg-zinc-500 rounded-lg p-5 shadow-lg shadow-black/80">
                {/* Input com a query para buscar a cidade na API */}
                <MapPin />
                <Input
                  onChange={setQuery}
                  disabled={disabledInput}
                  value={query}
                  placeholder="Qual sera o destino ?"
                />

                {/* Dropdown com os resultados da query */}
                {results.length > 0 && (
                  <div className="mt-2 bg-zinc-700 rounded shadow-lg max-h-40 overflow-y-auto">
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className="p-3 hover:bg-white cursor-pointer text-zinc-400"
                        onClick={() => selectDestination(result)}>
                        {result.name} , {result.contry}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Calendario */}
              <div className=" flex flex-col justify-center items-center gap-5 bg-zinc-500 rounded-lg p-4 shadow-lg shadow-black/80">
                {showCalendar ? (
                  <div className="flex flex-col items-center gap-2">
                    <div>
                      <CalendarPicker />
                    </div>
                    <Button onClick={handleCalendar}>Fechar calendário</Button>
                  </div>
                ) : (
                  <Button onClick={handleCalendar} disabled={disabledCalendar}>
                    <Calendar /> Abrir calendario
                  </Button>
                )}
              </div>

              {showInviteEmail ? (
                <Button onClick={handleHideInviteEmail}>
                  Alterar local/data <Calendar />
                </Button>
              ) : (
                <Button onClick={handleShowInviteEmail}>Continuar</Button>
              )}
            </div>

            {/* Rederizaçao condicional */}
            {showInviteEmail && (
              <div className="w-full">
                <div className=" flex flex-row justify-between gap-3 bg-zinc-500 rounded-lg p-5 shadow-lg shadow-black/80 w-full">
                  <div>
                    <User />
                    <p>Adicione convidados para a viagem</p>
                  </div>
                  <Button onClick={handleShowDialog}>
                    Adicionar convidados
                  </Button>
                </div>
              </div>
            )}
            <div>
              <Button
                disabled={
                  !selectedDestination ||
                  !startDateFormatted ||
                  !endDateFormatted
                }
                onClick={handleSubmit}>
                Criar viagem
              </Button>
            </div>
          </div>
        </form>

        {/* Dialog*/}
        {showDialog && (
          <Dialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            guests={guests}
            setGuests={setGuests}
          />
        )}

        {/*Seção com as informaçoes do clima dos dias que foi escolhido pelo usuario*/}
        {weather && (
          <section className="flex flex-col items-center bg-zinc-600 rounded-lg shadow-lg shadow-black/80 border border-white/5 p-10">
            {weather?.dates.map((day, index) => (
              <div key={day} className="text-white">
                <p>📅 {day}</p>
                <p>
                  🌡️ {weather.temperature_2m_min[index]}°C -{" "}
                  {weather.temperature_2m_max[index]}°C
                </p>
              </div>
            ))}
          </section>
        )}

        {/*Texto de politica*/}
        <div className="flex items-center justify-center">
          <p>
            Ao planejar sua viagem pelça Travel.com voce automaticamente
            concorda com nossos{" "}
            <a className="underline" href="#">
              termos de uso
            </a>{" "}
            e
            <a className="underline" href="#">
              {"  "}
              politicas de privacidade.
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
