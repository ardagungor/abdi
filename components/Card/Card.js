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
import { rules } from "../../utils/rules";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [deckId, setDeckId] = useState("");
  const [remaining, setRemaining] = useState();
  const [text, setText] = useState("");

  useEffect(() => {});

  const newDeck = () => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => {
        setDeckId(res.data.deck_id);
        setRemaining(res.data.remaining);
        setText("");
        setCurrentCard({
          image: "https://www.newstr.net/wp-content/uploads/image-46.png",
        });
      })
      .catch((err) => console.log(err));
  };

  const newCard = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => {
        setCurrentCard(res.data.cards[0]);
        setRemaining(res.data.remaining);
        setText(rules(res.data.cards[0].value));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    newDeck();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Deck ID: {deckId}</Text>
      <Text>Remaining: {remaining}</Text>
      <Image
        source={{
          uri: currentCard.image,
        }}
        style={{ width: 320, height: 450, marginBottom: 30 }}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Kart çek" onPress={newCard} />
        <Button title="Yeni deste" onPress={newDeck} style={styles.button} />
      </View>
      <Text style={styles.description}>{text}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems: "center",
  },
  description: {
    fontSize: 20,
    marginVertical: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingLeft: 50,
  },
});
