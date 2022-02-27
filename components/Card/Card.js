import {
  Image,
  View,
  Text,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState();

  useEffect(() => {});

  const newDeck = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => {
        setDeckId(res.data.deck_id);
        setRemaining(res.data.remaining);
      })
      .catch((err) => console.log(err));
  };

  const newCard = () => {
    console.log("Card drawn");
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => {
        console.log(res.data.cards[0].value);
        setCurrentCard(res.data.cards[0]);
        setRemaining(res.data.remaining);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    newDeck();
  }, []);

  return (
    <View style={styles}>
      <Text>Deck ID: {deckId}</Text>
      <Text>Remaining: {remaining}</Text>
      <Image
        source={{
          uri: currentCard.image,
        }}
        style={{ width: 300, height: 450, marginBottom: 30 }}
      />
      <Button title="Kart çek" onPress={newCard} style={{ top: 30 }} />
      <Button title="Yeni deste" onPress={newDeck} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
