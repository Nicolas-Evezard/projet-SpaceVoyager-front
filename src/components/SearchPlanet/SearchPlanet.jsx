import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardPlanet from "./CardPlanet/CardPlanet";

import { useBooking } from "../../contexts/BoonkingContext";

export default function SearchPlanet({
  departureDate,
  comebackDate,
  person,
  setPlanet,
  planet,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [cardSelected, setCardSelected] = useState([]);

  const { state, dispatch } = useBooking();

  const fetchSearchPlanet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking/search?departureDate=${departureDate}&comebackDate=${comebackDate}&person=${person}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setError(error);
    }
  };

  const navigate = useNavigate();
  const handleClick = (start, end, passengers, planet) => {
    setPlanet(planet.name);

    // Utilisez dispatch pour enregistrer l'objet planet choisie
    dispatch({ type: "SET_PLANET", payload: planet });

    navigate(
      `/search?departureDate=${start}&comebackDate=${end}&person=${passengers}&planet=${planet.name}`
    );
  };

  useEffect(() => {
    fetchSearchPlanet();
  }, []);

  useEffect(() => {
    console.log("cardSelected", cardSelected);
  }, [cardSelected]);

  return (
    <>
      <div className=" flex flex-col h-full justify-between">

        <div className="flex gap-2 flex-col">
          <div className="flex gap-2 mx-4">
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold">Date aller :</h2>
              <p className="text-center">{departureDate}</p>
            </div>
            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="font-bold">Date retour :</h2>
              <p className="text-center">{comebackDate}</p>
            </div>
          </div>

          <div className=" flex gap-2 bg-indigo-50/10 mx-4 p-2 backdrop-blur-sm text-white rounded-lg text-center">
            <h2 className="font-bold">Nombre de passager :</h2>
            <p className="">{person}</p>
          </div>

          <div>
            <ul className="steps">
              <li className="step step-primary">Choix planet</li>
              <li className="step">Choix hotel</li>
              <li className="step">Confirmation</li>
            </ul>
          </div>

        </div>

   

          <div className="overflow-y-auto h-80">
            {error ? (
              <p>Une erreur s'est produite : {error.message}</p>
            ) : data ? (
              data.map((planetData) => (
                <CardPlanet
                  key={planetData.id}
                  planetData={planetData}
                  setCardSelected={setCardSelected}
                />
              ))
            ) : (
              <p>Chargement en cours...</p>
            )}
          </div>


        <div className="">

          <div className="flex gap-2 mx-4">

            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="">Planet selectionnée :</h2>
              {cardSelected.name ? <p>{cardSelected.name}</p> : <p>_</p>}
            </div>

            <div className="w-1/2 bg-indigo-50/10 p-2 backdrop-blur-sm text-white rounded-lg">
              <h2 className="">détails voyage :</h2>
              <p>
                Prix :{" "}
                {cardSelected.name ? (
                  <span>
                    {cardSelected.price}€ x {person}
                  </span>
                ) : (
                  <sapn>_</sapn>
                )}
              </p>
              <p>Prix total : {cardSelected.price * person}€</p>
            </div>

          </div>

          <button
            className=""
            onClick={() =>
              handleClick(departureDate, comebackDate, person, cardSelected)
            }
          >
            VALIDER
          </button>

        </div>

      </div>

    </>
  );
}
