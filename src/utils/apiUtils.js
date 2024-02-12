import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";

export const createEmptyCollection = async (userId) => {
  try {
    const { error, data } = await supabase
      .from("collections")
      .insert({
        id: uuidv4(),
        created_at: new Date().toISOString(),
        user_id: userId,
        artworks: [],
      })
      .select();
    if (error) {
      return error;
    } else {
      return data[0];
    }
  } catch (error) {
    console.log("ERROR_CREATING_COLLECTION", error);
  }
};

export const getCollection = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("collections")
      .select()
      .eq("user_id", userId);

    if (error) {
      return error;
    } else {
      return data[0];
    }
  } catch (error) {
    console.log("ERROR_GETTING_COLLECTION", error);
  }
};

export const updateCollectionArtworks = async (userId, artworks) => {
  try {
    const { data, error } = await supabase
      .from("collections")
      .update({ artworks: artworks })
      .eq("user_id", userId)
      .select();

    if (error) {
      return { error: error };
    } else {
      return { data: data };
    }
  } catch (error) {
    console.log("ERROR_UPDATING_COLLECTION_ARTWORKS", error);
  }
};
