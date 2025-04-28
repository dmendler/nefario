import React, { useState, useEffect } from "react";
import {
  createPerson,
  deleteSwimmer,
  updatePerson,
} from "./PullDBService";
import { parseTimeInput } from "./ScoreService";

export const handleChange = (e, formData, setFormData) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
};

export const handleSubmit = async (e, formData, setFormData, isEditing, editSwimmerId, setIsEditing, setEditSwimmerId, fetchSwimmers) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.team_id) {
      alert("First name, last name, and team ID are required.");
      return;
    }

    const cleanedFormData = { ...formData };
    for (const key in cleanedFormData) {
      if (key.endsWith("_time") && cleanedFormData[key]) {
        const parsed = parseTimeInput(cleanedFormData[key]);
        if (!isNaN(parsed)) {
          cleanedFormData[key] = parsed;
        }
      }
    }

    try {
      if (isEditing && editSwimmerId) {
        await updatePerson({ ...cleanedFormData, objectId: editSwimmerId });
        alert("Swimmer updated successfully!");
      } else {
        await createPerson(cleanedFormData);
        alert("Swimmer added successfully!");
      }

      setFormData({
        first_name: "",
        last_name: "",
        team_id: "1",
        fly_50_time: "",
        fly_100_time: "",
        fly_200_time: "",
        back_50_time: "",
        back_100_time: "",
        back_200_time: "",
        breast_50_time: "",
        breast_100_time: "",
        breast_200_time: "",
        free_50_time: "",
        free_100_time: "",
        free_200_time: "",
        free_500_time: "",
        free_1000_time: "",
        free_1650_time: "",
        im_200_time: "",
      });
      setIsEditing(false);
      setEditSwimmerId(null);
      await fetchSwimmers();
    } catch (error) {
      console.error("Error adding/updating swimmer:", error);
      alert("Failed to add/update swimmer.");
    }
};

export const handleDelete = async (selectedSwimmer, fetchSwimmers, setSelectedSwimmer, setIsEditing, setEditSwimmerId) => {
    if (!selectedSwimmer) return;

    console.log("Trying to delete swimmer with id:", selectedSwimmer);
    await deleteSwimmer(selectedSwimmer);
    await fetchSwimmers();
    setSelectedSwimmer("");
    setIsEditing(false);
    setEditSwimmerId(null);
    alert("Swimmer deleted successfully!");
};

export const handleEdit = async (selectedSwimmer, swimmers, setFormData, setIsEditing, setEditSwimmerId) => {
    if (!selectedSwimmer) return;

    const swimmer = swimmers.find(
      (s) => (s.id || s.get("objectId")) === selectedSwimmer
    );
    if (!swimmer) return;

    setFormData({
      first_name: swimmer.get("first_name") || "",
      last_name: swimmer.get("last_name") || "",
      team_id: swimmer.get("team_id")?.toString() || "1",
      fly_50_time: swimmer.get("fly_50_time") || "",
      fly_100_time: swimmer.get("fly_100_time") || "",
      fly_200_time: swimmer.get("fly_200_time") || "",
      back_50_time: swimmer.get("back_50_time") || "",
      back_100_time: swimmer.get("back_100_time") || "",
      back_200_time: swimmer.get("back_200_time") || "",
      breast_50_time: swimmer.get("breast_50_time") || "",
      breast_100_time: swimmer.get("breast_100_time") || "",
      breast_200_time: swimmer.get("breast_200_time") || "",
      free_50_time: swimmer.get("free_50_time") || "",
      free_100_time: swimmer.get("free_100_time") || "",
      free_200_time: swimmer.get("free_200_time") || "",
      free_500_time: swimmer.get("free_500_time") || "",
      free_1000_time: swimmer.get("free_1000_time") || "",
      free_1650_time: swimmer.get("free_1650_time") || "",
      im_200_time: swimmer.get("im_200_time") || "",
    });

    setIsEditing(true);
    setEditSwimmerId(swimmer.id || swimmer.get("objectId"));
  };