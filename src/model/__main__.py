from typing import Any
from numpy._typing import NDArray
import keras
from keras.models import Sequential
from keras.layers import Embedding, LSTM, Dense
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import joblib
import sys


def get_tokenizer(training_data: list[str]) -> Tokenizer:
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(training_data)
    return tokenizer


def get_padded_input_sequences(
    tokenizer: Tokenizer, training_data: list[str]
) -> tuple[NDArray[Any], int]:
    # Convert data to sequences
    input_sequences = tokenizer.texts_to_sequences(training_data)
    max_sequence_length = max(map(len, input_sequences))
    # Pad sequences for consistent input size
    ps = pad_sequences(input_sequences, maxlen=max_sequence_length, padding="post")
    return ps, max_sequence_length


def get_model(
    max_sequence_length: int,
    total_words: int,
    intent_labels_one_hot: NDArray[Any],
    padded_input_sequences: NDArray[Any],
) -> Sequential:
    # Model architecture
    model = Sequential()
    model.add(
        Embedding(
            input_dim=total_words, output_dim=64, input_length=max_sequence_length
        )
    )
    model.add(LSTM(100))
    model.add(Dense(len(intent_labels_one_hot[0]), activation="softmax"))
    model.compile(
        optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
    )

    # Train the model
    model.fit(
        padded_input_sequences, intent_labels_one_hot, epochs=10, validation_split=0.2
    )
    return model


def train(training_data: list[str], intent_labels: list[str]) -> Sequential:
    # Convert intent labels to one-hot encoding
    intent_labels_one_hot = keras.utils.to_categorical(intent_labels)
    tokenizer = get_tokenizer(training_data)
    padded_input_sequences, max_sequence_length = get_padded_input_sequences(
        tokenizer, training_data
    )
    total_words = len(tokenizer.word_index) + 1
    return get_model(
        max_sequence_length, total_words, intent_labels_one_hot, padded_input_sequences
    )


def softmax(predictions: list[int]) -> int:
    probabilities = keras.activations.softmax(predictions)
    return predictions.index(max(probabilities))


def prompt(
    query: str, model: Sequential, training_data: list[str], intent_labels: list[str]
) -> str:
    # Tokenize input
    tokenizer = get_tokenizer(training_data)
    # Embed into vector
    sequence = tokenizer.texts_to_sequences([query])
    padded_sequence = keras.preprocessing.sequence.pad_sequences(
        sequence, padding="post"
    )
    # Predict the intent
    predictions = model.predict(padded_sequence)
    best_prediction_idx = softmax(predictions)
    # Map the index back to the actual intent
    return intent_labels[best_prediction_idx]


def main():
    query = " ".join(sys.argv[1:])
    loaded_model = joblib.load("model.pkl")
    training_data = joblib.load("train.pkl")
    intent_labels = joblib.load("intent.pkl")
    predicted_intent = prompt(query, loaded_model, training_data, intent_labels)
    print(predicted_intent)


if __name__ == "__main__":
    main()
