import { PlaneTakeoff, Calendar, MapPin, User } from "lucide-react";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import type { Range } from "react-date-range";
import Dialog from "./components/Dialog";
import { Button } from "./components/Button";

function App() {
  const [guests, setGuests] = useState<string[]>([]);
  const [showInviteEmail, setShowInviteEmail] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledCalendar, setDisabledCalendar] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [destination, setDestination] = useState<string>("");
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startDate = range[0].startDate ?? new Date();
  const endDate = range[0].endDate ?? new Date();
  const diffTime = endDate.getTime() - startDate.getTime();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const handleSubmit = () => {
    // Lógica para enviar os dados da viagem e convidados para o backend
    window.alert(
      "Viagem planejada com sucesso! Convidados: " +
        guests.join(", ") +
        " | Duração: " +
        days +
        " dias" +
        " | Data de início: " +
        startDate.toLocaleDateString() +
        " | Data de término: " +
        endDate.toLocaleDateString() +
        " | Destino: " +
        destination,
    );
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };
  const openCalendar = () => {
    setShowCalendar(true);
  };

  const handleShowInviteEmail = () => {
    setShowInviteEmail(true);
    setDisabledInput(true);
    setShowCalendar(false);
    setDisabledCalendar(true);
  };

  const handleHideInviteEmail = () => {
    setShowInviteEmail(false);
    setDisabledInput(false);
    setDisabledCalendar(false);
  };
  const handleShowDialog = () => {
    setShowDialog(true);
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
                <MapPin />
                <input
                  className="p-2 mt-2 outline-0 font-bold text-2xl"
                  type="text"
                  placeholder="Quando voce deseja ir?"
                  disabled={disabledInput}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className=" flex flex-col justify-center items-center gap-5 bg-zinc-500 rounded-lg p-4 shadow-lg shadow-black/80">
                {showCalendar ? (
                  <div className="flex flex-col items-center gap-2">
                    <div>
                      <DateRangePicker
                        onChange={(item) => setRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={range}
                        direction="horizontal"
                      />
                    </div>
                    <Button onClick={closeCalendar}>Fechar calendário</Button>
                  </div>
                ) : (
                  <Button onClick={openCalendar} disabled={disabledCalendar}>
                    Abrir calendario
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
              <Button onClick={handleSubmit}>Planejar viagem</Button>
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

        {/*Texto  */}
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
