import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Clock, Star } from "lucide-react";
import { trips } from "@/data/trips";
import {
  SplitTextReveal,
  ClipReveal,
} from "@/components/animations/AnimationUtils";

interface Destination {
  id: string;
  label: string;
  country: "uganda" | "rwanda";
  cx: number;
  cy: number;
}

const destinations: Destination[] = [
  // Uganda destinations (in Uganda SVG coord space)
  { id: "murchison", label: "Murchison Falls", country: "uganda", cx: 530, cy: 240 },
  { id: "kibale", label: "Kibale Forest", country: "uganda", cx: 370, cy: 530 },
  { id: "rwenzori", label: "Rwenzori Mountains", country: "uganda", cx: 310, cy: 480 },
  { id: "queen-elizabeth", label: "Queen Elizabeth", country: "uganda", cx: 380, cy: 610 },
  { id: "bwindi", label: "Bwindi", country: "uganda", cx: 360, cy: 720 },
  { id: "mgahinga", label: "Mgahinga", country: "uganda", cx: 400, cy: 770 },
  { id: "lake-mburo", label: "Lake Mburo", country: "uganda", cx: 500, cy: 650 },
  // Rwanda destinations (in Rwanda SVG coord space 0-1000 x 0-871)
  { id: "volcanoes", label: "Volcanoes NP", country: "rwanda", cx: 350, cy: 200 },
  { id: "akagera", label: "Akagera", country: "rwanda", cx: 800, cy: 350 },
  { id: "nyungwe", label: "Nyungwe Forest", country: "rwanda", cx: 200, cy: 600 },
];

const UGANDA_PATH = "M212 889.4l-1.8-0.6-2.4-0.7-2.2 0.3-2.1 0.9-2.5 0.7-2.7-0.4-2.7-0.8-2.6-0.4-2.5 0.9-1.3 2.3-1 6.6-0.9 2.4-0.9 0.8-2.7 1.2-0.6 0.5-0.5 0.4-0.5 1-0.4 2.3-0.3 1-1.7 2.9-2.1 2.7-7.1 6.7-2.4 1.5-1.2 0.3-1.3 0.1-1.2 0.3-1.3 0.7-1.1 2.2-1 6.2-0.8 2.4-1.8 1.6-6.5 2.5-4.7 2.6-0.8 0.4-2.1 2.2-1.4 3.4-1.7 0.4-10.8 6-3.5 1.3-3.4 0.3-3.1-0.8-2.7-2.6-1.6-3.4-0.4-6.5-0.7-3.4-4.5-6.5-1.7-0.9-1.4-0.2-1.4 0.4-1.5 0.9-1.4 1.7-1 3.2-1.3 0.8-1.1-0.4-3.4-2.1-1.9-0.4-3.9 0.7-2.7 1.4-2.4 1.7-3.3 1.9-3 0.8-3.3 0.2-6.4-0.3 1.5-9.4-0.1-3-0.6-1.8-1.9-3.2 0-1.7 1.5-4.1 0.1-1.3-0.9-3.5-1.7-2.4-1.3-2.6 0-3.8 2-9.9 0.1-2.8-0.6-3.1-2.4-6.2-0.4-2.8 0.4-1.9 0.1 0 0.8-1.4 0.6-1.5-0.2-2.4-0.6-3-0.1-1.6 0.2-1.4 1.8-2.8 4.7-1.6 1.8-2.2 0.4-2.3 0.4-9.6-0.3-3.3-1.5-6.3 0.2-3.3 2-12.5 0.5-0.9 0.9-0.6 0.8-0.8 0.2-1.3-0.4-0.9-1.2-1.7-0.3-1 0.6-1.7 1.5-0.5 1.7-0.1 1.3-0.9 0.4-2.2-0.6-9.8-0.7-2.4-1.7-3.5-0.4-0.9-0.4-3 3.4-20.1 0.5-2.8 2.6-15.7 1-5.7 2.8-16.2 2.4-5.9 0.8-3-0.1-3.1-1.9-6.9 0.2-2.8 1.4-4.3 7-9.8 0.9-1.8 1.9 0.8 1.2 1 1.1 0.4 1.5-1 0.6-1.2 5.1-26.3 1.1-3.4 1.8-3 8.5-9.7 3-3.5 0.5-1.1 2.3-5-0.4-6.2-2.9-12.9 0-3.3 2-13.5-0.9-8.2 0.3-1.6 3-6.4 2.1-1.1 3.5-2.7 2.2-1.8 6.7-3 17-3.9 1.6-0.9 1.7-2 2.9-5.4 0.5-0.6 0.7-2.5 3.6-3.8 1.1-3-0.8-6.5-0.1-3 2.1-1.9 0.5-1.4 0.4-1.7 0.4-3.4 0.4-1 4.9-5 1.3-0.7 1.4-0.4 1.5 0.2 1.7 1.4 2.8 1.3 1.9-2.1 1.9-3.2 2.7-2.1 1.9-0.1 3.6 0.4 2.1-0.3 3-0.8 2.3-0.9 2-1.4 3.2-2.7 2.4 2.4 2.3 1.2 0 1.1-3.4 1.6 0.2 2.9 1 3.4-1 3 1.5 3.2 1.3 2 0.7 2.2-0.3 3.5-0.8 1.4-1.1 1.5-0.6 1.5 0.9 1.7 1.4 0 1.7-1.2 3-2.6-0.3 2-0.4 1.8-0.2 1.6 0.5 1.6 1-1.2 0.4-1.3 0.7-1.3 1.5-1 1.5 1.7 1.9 0.9 2.2 0.1 2-0.7 0-1-0.6-0.1-1.5-0.9 1.7-0.3 0.9-0.3 0.1-0.7-0.6-0.9 17.7-18.6 0.7-2.9 0-2.5 0.2-2.5 1.7-2.5 26.7-30.9 4.8-9.4 2.9-4 4.4-2.5 5.4-1.4 4.6-2.3 2-4.8 1.1 0.5 1.1 0.7 2-1.2 1.7 0.3 1.8 0.6 2.2 0.3 1.9-0.5 9.7-5.2 9.1-8.6 6.5-4.3 2.2-2.6 2.2-4.1 1-3.6 1-8.3 1.4-3.3 4.6 1.3 3.4-2.1 2.2-4.1 0.8-5.8 0.4-0.8 0.3-0.7 0.3-0.9 0-3.8-0.4-2.3-2.9-7.1 3.2-4.4-0.3-5.3-4-10 2.6-2.7-0.9-3.7-2.3-3.7-2.1-2.4-0.3-1.4-0.2-7.3 0.3-1.4 0.9-1.4 1.1-1.3 0.9-0.9 5.3-3.9 3.3-1.9 2.9-0.8 2.8-1.5 1-3.7 0-7.9-0.8 1.7-0.6 4.2-0.7 1.9-1.7 1.8-1.8 1.1-8.4 3-3 2-6.8 7.6-1.7 2.7-1.3 3-0.5 3.3-1.4 2.4-4 3.3-0.3-0.5-9-5.1-3.4-2.6-1.2-2.7-0.5-3.4-0.3-6.9-7.7 2.9-2.6 0.5-2.2-0.1-7-1.2-2.3-1.3-0.8-1.4 0.5-0.7 0.9-0.4 0.2-0.9-0.3-1.2-0.4-0.7-9-10.1-2.7-1.7-5.9-0.1-2.6 4.4-2.2 5.2-4.6 2.2-2.7-1.2-3-2.7-2.6-3.1-1.6-2.6-0.5-2.4 0.1-2.4-0.4-2-1.6-0.9-11.2-0.1-2.3-0.7-0.4-2.7 1.4-3.3 2-3.3 1.3-2.6 0.1-2.8-0.6-5.9 0.2-3 0.6-1.6 3.2-4.9 0.3-1.2 0.2-0.7 0.3-2 5.3-14.4 0.2-0.8 0.1-1.6 0.4-0.9 0.6-0.5 2-0.3 0.6-0.3 1.1-1.6 3.9-10.8 0.3-6.3-1.8-6.4-3.6-6.4-2.8-2.5-7.4-5.2-1.9-2.4-0.2-3.1 0.6-3.3 2.5-7.5 6.5-19.6 2.8-5.6 0.6-0.4 1.9-0.4 0.8-0.4 0.5-0.8 0.2-1.7 0.3-0.8 3.1-5.4 4.6-5.1 1.3-1.8 0.8-1.1 1-3.5-0.3-1.8-1.6-3.4-0.3-1.8 1.1-4.5-0.1-1.5-2-3.8-2.6 0.9-3 2.6-3.5 1.3 0.7-2.5 3.5-6.9 10.5-15.4 0.8-1.8 0.4-1.9 0.9-1.7 1.7-1.6 1.7-0.6 3.2 0.1 1.6-0.2 2.1-1 5-3.9 1.4-0.6 3.1-0.6 1.4-0.6 4.3-3.3 5.9-4.7 4.2-1.1 7.5 0 6.5 0.9 6.3 2 13.2 7.2 20.3 11.1 3 0.6 1.7-1.5 0.1-0.2 1.9-2.3 2.8-1.4 16.6-2.4 2.9-1.3 1.5-1.3 12.7-14.3 0.3-1 0.5 0.1 3.2 1.5 1 0.5 3.7 3.1 11.4 12.8 2.3 3.8 0.6 3 0.5 7.4 1.1 2.7 2.2 1.1 12.5 0.8 1.3 0.1 1.8 1 2 3.2 1 1.7 2.5 2.5 2.7 1.4 10 2 1.9 0 1.1-1.4 0.2-1 0.5-2.3 0-2.5-0.7-5.7 0.2-2.1 1.9-2.1 29.3-17.9 7-1.6 29.3-2.4 25.1-2.1 13.4-4 12.5-6.4 9.7-7.2 2.8-1 3.2 1.3 20.1 16.5 3.4 1.8 4.9 0.9 14.6 0.8 25.6 1.3 6.9-0.9 5.9-3.5 0.8-0.4 11.8-11.8 15.2-15.4 17.9-17.9 13.1-13.1 12.9-13 4.6 2.2 3.6 2.8 2 3.7-0.2 5 0.2 2.1 1.4 1.8 1.8 1.6 1.3 1.8 0.5 1.9 0.1 1.8-0.5 3.8-0.6 2.2-0.7 1.5-0.1 1.6 1.3 2.6 1.9 1.8 2.3 1.5 1.9 1.9 0.4 2.5-1.7 4.1-2.1 3.7-0.2 2.8 3.7 1.3 2.5-0.4 6.3-2.3 3.1 0 3.6 1.9 0.4 2.1-1.7 2.2-7.7 3.9 0.3 0.9 2.5 1 2 2.4-3.1 2-1.1 1.3 2 0.7 1.4-0.1 2.7-0.7 3.2-0.2 3.1-0.9 1.7-0.1 0.1 0.8 3.6 4.6 2.4 6.4 1.8 1 0.8-0.6 0.6-1.6 1.7-1.5 4.3-1.3 2.9 1.2 5.2 5.5 3 1.6 3 0.9 2.3 1.5 1.1 3.4-0.4 12.8-1.5 6.4-3 4.7-1.5 0.8-1.7 0.4-1.4 0.6-0.9 1.4 0.1 1.7 2 3.5 0.7 1.7-0.3 1.5-1.6 4-0.5 1.8 0.4 1.9 1.3 1.7 1.5 1.6 1.2 1.7 2 6.4 1.6 19.6 1.7 3.7 3.4 2.1 7.5 2.2 3.3 2.2 1.9 3.3 0 0.1 4.7 24.1 1.6 2.8 5 5.6 2.4 3.8 1.5 1.6 2.1 0.5 1-0.3 1.8-1.5 0.7-0.3 0.4-0.3 0.7-1.2 0.4-0.3 0.6 0.3 0.3 0.6 0.3 0.5 0.3 0.3 0.3 0.4 4.5 2.2 0.8 0.2 1.1 1.4 0.7 1.4 3.2 10 2.5 13.9 6.7 14 1.5 1.5 2.2 0.2 1.3-1.2 1-1.4 1.5-0.2 1.6 2.2 0.9 7.9 0.9 3.1 4.3 4.5 1.5 2.7-0.4 3.6-2.4 2.8-3.2 1.9-2.9 2.2-1.4 3.9 1.1 6.3 6.1 14.9 2.9 6.9 7.2 17.4 0 3.1-1.5 7.1-0.2 3.1 0.2 3.3 0.6 3.2 1.2 2.8 1.4 1.7 3.7 3.5 0.8 1.8-0.6 1.7-2.9 3.7-0.7 2-0.2 31-1 3.5-5 10.7-1.2 1.8-1.6 1.5-1.6 0.8-3.3 0.6-1.6 0.8-3.7 5.5-3.4 12.9-9.5 7.8 0.3 2.6 0.3 3 2.8 6.5 1.7 6.4-2 6.5-5.1 2.3-13.1 1.3-3.4 2-5.4 5.3-7.7 1.7-1.1 2.9-0.3 3.6-0.8 1.4-0.9 1.6-0.2 0-3.1 0.6-2.6-1.5-2.7-0.6-3.2 3.2-1.6 2.9-1.3 3.2-0.9 3.4-0.1 7.2-0.9 3.2-4.1 10.2-4.6 6-2.3 6.4-2.8 2.5-10.2 5.2-1.3 1.4-0.4 2-0.6 3.6-2.6 6.9-3.8 4.1-5.2 2.6-6.4 2.4-4.8 3.2-2.7 4.9-0.1 0.6-3.9 15.7-0.5 1.4-1.1 1.6-2.7 3.3-0.7 1.4 0.1 3 1.8 5.8-0.4 3.2-1.4 2.1-5.7 4.5-7.2 9.6-0.4-0.9-0.6-0.9-1.1-1.2-0.1-0.2-0.3 0.2-1.3 0.2-1 1.1-7.1 5.9-0.8 2.4-1.8 0.8-1.5 1.1-0.3 3-5-2.4-4.9-3.2-0.7 2.4-0.6 4.3-0.9 2.1-1.3-3.8-0.3-3.6-0.5-3.2-2.3-2.6-0.6 2.5 0.2 1.9 0 1.7-1.7 1.6-2.1-0.5-6.7-0.3-2.1-1.4 0.2-2.2 1.7-2.8 2.1-2.5 1.5-1.3 0-1-2-0.6-1.9-0.3-2 0.1-1.8 0.8 1.1-3.3 2.1-2.3 3-1.4 3.5-0.6-1.1-1.3-2.1-1.1-2.4-0.8-1.9-0.2-2.3 0.3-1.4 0.7-2.8 2.4-1.9-1.4-2.2-0.6-2 0.4-1.6 1.6-0.1 1.9 1.2 8.4-1.4 3.1-3 1.8-3 1.3-1.4 1.4-0.8 2.4-1.7 0.6-1.6-1-0.2-2.5-1.2 0-0.3 1.6-0.6 1-0.9 0.5-1.5 0.2 1.5-3.1 0.6-1.7 0.2-1.7-1.4 0.6-1.7 2.4-1.4 1.2 0.2-4.1-0.4-1.7-1.4-0.7-0.8 1-0.1 2.2 0.4 4.5-1.1 0-2.7-3.3-4.1-3-2.1-2.6 3.4-2.1-1.4-0.3-0.9-0.4-2-1.4 2.1-1.2-3.3-0.9-1.3-0.9-0.8-1.4 2.9 0 1.3 0.3 1.2 0.8 1.6-0.7 2.4 0.1 2.6 0.8 2.2 1-1.1 0.4-1 0.5 3 1.2 2.1-2.1 0-2.7-3-0.7 0.9-2.3-1.9-0.9-2.7-1-1.8-2.4 2.3-0.9-2.1-1-2.2 0.3-4.5 1.6 1.1 0.5 0.5 0.6 0.3 1 0.3 1.3-2.5-1.6-2.7-1-2.9-0.3-2.8 0.6 0.9-1.2 0.6-1.4 0.2-1.4-0.7-1.4-5.9 2.1-1.8 1.3-1.2-4.8 2.5-1.2 3.8-0.4 2.6-2.5-0.5-0.6-1.2-0.8-0.8-0.9 3.5-6.4 2.8-3.6-0.7-1-3.1-1-2.2 3.5-1 3-4.3 3-4.5-0.3-1.2-6.9-1.4 1-5.2 2.3 1.4 3.4-2.3 2.1-4 0.7-3.8-0.8 0.9 3.5 2.8 1.2 3.3 0.3 4.5 1 1.2 0 0.6 0.7-0.1 2.1-0.9 0.8-3.5 2.1-0.6 0.5-2.9 0.7-5 2.9-2.9 0.7-2.7 1.3-0.5 3 0.9 3.4 1.8 2.1-1.8 1.5-0.9 0.4-1.2 0.2-0.7 0.4 0.1 1 0.2 1.1-0.2 0.9-0.6 0.6-1.5 1.3-1.5 0.4-0.6-1.8 1.7-2.2 0-1.2-4-0.8-2.8-1.3-1.6-0.5 0 1 1.2 0 0 1.1-1.3 0.6-4.4 2.8 4.6 0.8 5.3 0.3-2.1 5.7-1.1 2-1.2 1.2-11.1 8.5-3.4 1.9-10.5 3.7-3.1 0.1-1.3-1.9 0-2.5-0.1-0.4-0.7 0-1.9-1.4-0.7-1.8 0.9-1.5 1.8-1 1.7-0.7-1.9-0.8-0.2-1.4 0.8-1.7 1.3-1.5-0.5-0.1-1.7 0.1 0.4-1.2 0.3-0.4 0.5-0.7-2.5 0.8-2.1 3.5-0.8-2-1.2 0 0.2 2.9 0.4 1.3 0.6 1.2-2.2-0.7-2.1 0.3-1.6 0-0.8-1.9-1.1 0-1.1 1.8-0.7 1.9-0.3 2.2-0.1 3-4-2.3-2.4-0.9-1.2 0.5-0.8 1.1-1.9 0.9-2 0.5-1.3 0.2-1.1 0.6-1.5 1.2-2 0.9-2.5-0.4-0.9-1.1-0.1-3.4-1.2-2.2 1.5 0.1 1.3-0.4 1.6-0.8 0.8-0.1 2.9 0.1 1.2-0.7 2.7-3.5 2.2-1.1-0.9-1.6-0.8-2-1-1.5-1.6-0.5-1.2 3.3-1.3 2.2-1.4 1.1-4.7-0.7-0.6-1.8 3.7-6.2-1.1-2.3-2.7 2.3-1.4-1.4 0-2.7 2.5-2.5 0.5-2.2-0.6-1.9-2.8-0.3-1.7 2.8-1.3 5.3-1.7 4.6-2.8 0.4-0.6 2-1.1-0.2-1.4-0.6-1.8 0.4-0.8 1.4 2 2.4-0.6 2.1 2.9 1.9 1.4 0.4 0 1.1-1.2 0.2-3.1 0.9 2.6 4.1-1.6 0.4-2.9-1.3-1.4-0.9-1.1 2.7 4.2 6.6-2 2.7-1.7-3.5-1.2-1.5-1.5-0.5-1 0.7-0.9 2.8-1.4 0.8-1.4-4.7-0.8-0.7-1.2 0.3-0.6 1.2-0.4 1.3-1.6 1.8-1.4 2.4-1.8 1.8-2.3-0.6-2.4-2.4-0.4-1 3.4-2.6 1.4-1.6 1.3-2.2 0.2-2.2-1.9-1.6-1.3 3.2-2.9 2.6-3.2 0.8-2.4-2.2-3.3 1 1.5 5-0.9 9.2 1.6 3.3-1 0.1-3.3-0.1 0-5.4-4.4-2.8-6.1-1.7-4.9-2.2-1.1 1.2 4.9 4 2 2.7-0.3 3.1-3.3 1.8-4.5-1.2-4.1-2.9-2.4-3.2 0.8-0.8 0.2-0.7 0-0.8 0.2-0.9-2 3-0.3 0.7 0.4 1.8 1.5 2.9 0.4 1.4-0.3 2.8-0.9 2.5-1.9 1.7-2.9 0.7-6.1-1.5-4.4-2.8-4.4-1.5-6.3 2.5-1-0.5-2.4-0.7 1.6 3.6 5.7 1.4 1.3 3.7-2.9-0.7-6.4-0.3-2.7-1.1-8.8 6.2-3.2 1.5 2.4 0.8 0.9 0.2-0.8 2.4-1.4 6.4 5.6-1.9 1.6-0.2 1.4 1.1 0 2.5-0.9 4 0.8 1.6 0.7 0.6 1 0.1 1.3-0.1 1.2 0.4 0.4 1.1 0.2 1.2 0.5 1.1 1.3 1.7 1.4 2.6 0.9 2.7 0.3 2.3-1.2 0-1.7-3.2-3.4 1.4-3.2 3.7-1.5 4.1-1.1 2.3-5.6 7.1-2.1 2.1-7.2 3.4-3.4 2.3-1.4 3.6-0.5 2.3-1.1 2.3-5 6.8-0.6 1.7-1.3 6.4 0.1 1.5 1.9 3.1 0.2 1.2-0.6 1.1-1.3 0.3-1.2 1.3-3.8 7.5-6 6.5 0 1.2-1.8 1.7-1.2 3.8-0.3 4 0.6 2.4 2.8 0.7 3.6-0.2 3.1 0.6 1.4 2.8-0.5 9 0.6 7.1 0.4 1.4 2.3 1.1 0.2 1.3-0.5 1.6-0.3 0.6-25.1 0-29.2 0-25.8 0-3.4 0-29.2 0-29.3 0-10.3 0-2.5-1.2-5.6-1.4-6 3.1-6.1 1.9-2.3 1.2-5.7 6-2 1.7-3.9-1.2-3.4-0.4-8.1 0.8-3 0.7-1.9 0.1-0.9-0.4-0.8-0.9-1.2-0.8-2-0.1-1.3 1-0.1 0.2z";

const RWANDA_PATH = "M116.2 784.1l-6.8-7.6-9.2-4.6-13.3-1.4-6-2.4-16.7-10.9-3.5-3.6 3-34.2-3-10.4-4.6-4.7-5-2.4-4-2.7-1.6-5.8 1.6-5.9 7.7-6.9-1.5-5.5-4.6-8.1-1.6-8.9-0.9-9.5 3.3-11.8 6.3-5.4 12-4.2 9.4-2.7 7.7-4.6 6.4-6.5 5.2-8.1 3.4-6.7 1.5-4.8 0.5-3.9 4.6-4.3 3.8-1.3 12.9 0.4 19.9-5.3 15.4-12.2 11.2-17.4 7.1-21.2 2.6-18.7-1-16.2-11.9-70.3-0.9-16.4 2.2-16 8.4-19.7 16.7-26.8 11.5-18.3 9.4-17.9 5.4-7.9 21.7-17.9 4.5-5.9 12.3-25.3 5.1-6.7 7.1-2.9 34.2-1.4 1.1-0.3 1-0.6 0.9-1 1.5-2.4 8.7-13.6 15.4-16 17.8-12.9 17.6-6.3 18 1 9.4-0.7 8.3-2.2 9.3-5.2 6.9-5 7.5-3.9 10.8-2 5.4 1.2 9.5 5.8 3.1 1.1 3.7-2.1 2.7-8.9 4-4.8 4.2-2.6 3.9-1.1 3.9 0.6 0.1 0 4.9 2.5 12.6 18.2 2 9.4 1 18.5 4.4 9.4 7.7 7.2 8.7 2.5 9.4-1 9.9-3.7 30.4-16.8 4.6-1 4.1-9.7 5.8-6.1 2.3-1.2 13.2-7.1 18.3-7.1 4.9-4.5 2.3-6.9 2.7-17.3 3.2-6.1 3.5-2.1 3.6-0.6 3.5-0.3 3.4-1 6.9-4.1 19.9-18.9 5.8-7.5 4.9-8.1 0.8-3 1-6.4 1.3-2.7 1.5-1.2 1.6-1.4 7.5-3.3 2.8-2.3 2.3-6.8 2.9-18.5 3.8-6.4 6.8-2.5 7.4 1.1 7.6 2.3 7.6 0.9 7-1.7 5.9-2.7 6.1-0.8 6.8 2.1 4.9 1.6-3.6 3.7-3.4 4.9-1.4 5 1.5 4.8 6.5 4.5 1.5 6.1-1 2.7-1.7 2.5-1.2 2.7 0.8 2.7 3.9 2.6 3.6-0.5 2.9-1.6 1.8-0.5 5.5 4 1.9 2.7 1.8 11.6 2.7 6.5 8.2 13.5 2.6 9.2 4.2 5.4 0.9 3.6-0.5 1.4-1 2-1.1 2.6-0.4 3.3 2.4 7.2 5.8 4.4 13.2 5.4 4.7 3.4 6.7 6.3 4.1 2.5 29.6 11 8.8 1.3 8.7 5.2 2.5 11.7-0.8 11.7-1.4 5.3-2.4 2.6 2.7 5.8 7.4 9.9 5.5 5.9 2 3.5 4.4 16.1 4.3 10.1 7 5.5 10.6-4.1 3.3 9.5-0.4 11.5-5.8 35.3-0.1 4.9 1 2.3 4 6.1 1.1 4.1-5.1 12.3 1.5 4.7 3.6 18-2.5 7.6-4.5 6.7-2.5 6.9 3.4 8-7.3 5.7-2.7 2.9-2.2 3.6 13.4 2.2 1.3 11.8-5.9 26.1 8.4-1.8 8.1 4 6.8 6.9 4.8 6.4 3.7 13-15.4 49.9-3.8 19.7 1.8 30.7-1.8 9.1-4.7 8.4-5.8 4.2-7.5 3.4-6.9 3.9-6.3 1.6-3.2 1.8-4.1 1.1-3.7-0.9-23.3-11.5-4.8-1.5-5.8 0.8-5.2 4-6.3 12-5.1 4.3-9.3 0.5-9.7-2.8-9.6-1.2-8.6 5.1-14.7-0.6-14.9-7-24.4-19.9-2.5-3.6-2.3-6.2-2.2-2.5-1.5 0.6-14.2-3.4-2.1-1.1-7.2 2.1-4.4 4.1-1.9 2.4-2 2.7-5.8 5.3-6.4 3.3-8.4 2.8-8.6 1.7-7.2 0.3-5.6-1.2-13.9-6.8-5.2-0.5-1.6 3-0.3 4.2-0.9 3.1-20.2 25.4-7.6 5.3-10 0.3-10.3-4-9.4-6.2-7.3-6.4-13.9-16.4-5.5-4.3-5.1-1.8-4.3-0.1-3.7 0.4-3.5-0.5-7.9-6.8-0.8-0.7-3-2.6-3.6-2.1-4.6 0.2-1.3 2.5 0 4.1-2.9 23 3.2 34.4-9.7 33.9-1.8 45.9-0.2 5-2.4 9.9-4.3 9.8-5.5 9.2-5.9 8.1-9.2 9.3-8.4 5-9.1 1.7-11.1-0.3-10-3-5.1 0-3.3 4.2-1.5 9.4-2 4.2-4.3 2.6-10 1.3-8.5-1.3-18.6-6.2-4.8-1.6-3.2-0.2-13.3 4.9-3.3 2-3.6 1.4-4.6-0.2-9.8 1.3-8.4 5.3-8.5 2.9-10.4-5.9-16.2-3-8.7-1.6-8 0.9-19.3 8.4-11.1 1-3.9-8.5-0.5-5.6-4.2-9.3-1-5.2 1.5-4.7 6.2-7.6 1-5.1-2.8-5.5-9.7-9.2-0.1-0.4-1.5-6.1 0.6-5.2-0.4-2.1-5.4-4.1-8.2-4.7-9.5-2.2-18.9-2.4-10-3.1-27.2-11.8-7.2-1.1-26.1 1.7-10.1 10-7.8 44.8z";

type Country = "uganda" | "rwanda";

const DestinationMap = () => {
  const [activeCountry, setActiveCountry] = useState<Country>("uganda");
  const [activeId, setActiveId] = useState<string | null>(null);

  const countryDestinations = useMemo(() => {
    return destinations
      .filter((d) => d.country === activeCountry)
      .map((d) => ({
        ...d,
        tripCount: trips.filter((t) => t.destination === d.id).length,
      }));
  }, [activeCountry]);

  const activeTrips = useMemo(() => {
    if (!activeId) return [];
    return trips.filter((t) => t.destination === activeId).slice(0, 3);
  }, [activeId]);

  const activeDest = countryDestinations.find((d) => d.id === activeId);

  const handleCountrySwitch = (country: Country) => {
    setActiveCountry(country);
    setActiveId(null);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(170deg, hsl(100 25% 14%), hsl(100 20% 10%))' }}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <ClipReveal>
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-brand-earth-light mb-4">
              Explore Destinations
            </span>
          </ClipReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-cream mb-4">
            <SplitTextReveal>Choose Your Adventure</SplitTextReveal>
          </h2>
          <ClipReveal delay={0.2}>
            <p className="text-brand-cream/60 max-w-xl mx-auto text-lg mb-8">
              Select a country, then click a destination to explore safari packages
            </p>
          </ClipReveal>

          {/* Country tabs */}
          <div className="inline-flex items-center bg-brand-cream/10 rounded-full p-1.5 gap-1">
            {(["uganda", "rwanda"] as Country[]).map((country) => (
              <button
                key={country}
                onClick={() => handleCountrySwitch(country)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                  activeCountry === country
                    ? "bg-secondary text-secondary-foreground shadow-md"
                    : "text-brand-cream/50 hover:text-brand-cream"
                }`}
              >
                {country === "uganda" ? "🇺🇬 Uganda" : "🇷🇼 Rwanda"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCountry}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  viewBox={activeCountry === "uganda" ? "0 0 1000 950" : "0 0 1000 871"}
                  className="w-full max-w-lg mx-auto"
                  style={{ filter: "drop-shadow(0 4px 20px hsl(var(--foreground) / 0.05))" }}
                >
                  {/* Country outline */}
                  <path
                    d={activeCountry === "uganda" ? UGANDA_PATH : RWANDA_PATH}
                    fill={`hsl(var(--${activeCountry === "uganda" ? "primary" : "secondary"}) / 0.15)`}
                    stroke={`hsl(var(--brand-cream) / 0.35)`}
                    strokeWidth="2.5"
                  />

                  {/* Country label */}
                  <text
                    x={activeCountry === "uganda" ? "607" : "500"}
                    y={activeCountry === "uganda" ? "405" : "435"}
                    textAnchor="middle"
                    className={`${activeCountry === "uganda" ? "fill-primary/15" : "fill-secondary/15"} text-[32px] font-serif tracking-[0.2em] uppercase select-none pointer-events-none`}
                  >
                    {activeCountry === "uganda" ? "Uganda" : "Rwanda"}
                  </text>

                  {/* Destination pins */}
                  {countryDestinations.map((dest) => {
                    const isActive = activeId === dest.id;
                    const color = activeCountry === "uganda" ? "primary" : "secondary";
                    return (
                      <g
                        key={dest.id}
                        className="cursor-pointer"
                        onClick={() => setActiveId(isActive ? null : dest.id)}
                      >
                        {/* Pulse ring */}
                        <circle
                          cx={dest.cx}
                          cy={dest.cy}
                          r={isActive ? 22 : 14}
                          fill={isActive ? `hsl(var(--${color}) / 0.15)` : `hsl(var(--${color}) / 0.08)`}
                          className="transition-all duration-500"
                        >
                          {!isActive && (
                            <animate attributeName="r" values="14;20;14" dur="3s" repeatCount="indefinite" />
                          )}
                          {!isActive && (
                            <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                          )}
                        </circle>

                        {/* Pin dot */}
                        <circle
                          cx={dest.cx}
                          cy={dest.cy}
                          r={isActive ? 10 : 6}
                          fill={`hsl(var(--${color}))`}
                          stroke="white"
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />

                        {/* Trip count badge */}
                        {dest.tripCount > 0 && (
                          <>
                            <circle cx={dest.cx + 14} cy={dest.cy - 14} r="10" fill="hsl(var(--secondary))" />
                            <text
                              x={dest.cx + 14}
                              y={dest.cy - 10}
                              textAnchor="middle"
                              className="fill-secondary-foreground text-[11px] font-bold select-none"
                            >
                              {dest.tripCount}
                            </text>
                          </>
                        )}

                        {/* Label */}
                        <text
                          x={dest.cx}
                          y={dest.cy + (isActive ? 36 : 26)}
                          textAnchor="middle"
                          className={`text-[12px] font-semibold transition-all duration-300 select-none ${
                            isActive ? `fill-${color}` : "fill-brand-cream/60"
                          }`}
                          fill={isActive ? `hsl(var(--${color}))` : undefined}
                        >
                          {dest.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Trip details panel */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeDest && activeTrips.length > 0 ? (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-brand-cream">{activeDest.label}</h3>
                      <p className="text-sm text-brand-cream/50 capitalize">
                        {activeDest.country} · {activeDest.tripCount} trip{activeDest.tripCount !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeTrips.map((trip, i) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          to={`/trip-search?destination=${trip.destination}`}
                          className="group flex gap-4 p-4 rounded-xl border border-brand-cream/10 bg-brand-cream/5 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300"
                        >
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-brand-cream group-hover:text-secondary transition-colors line-clamp-1">{trip.title}</h4>
                            <div className="flex items-center gap-3 mt-1.5 text-sm text-brand-cream/50">
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{trip.duration} days</span>
                              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-secondary text-secondary" />{trip.rating}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-bold text-brand-cream">From ${trip.price.toLocaleString()}</span>
                              <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <Link
                    to={`/trip-search?destination=${activeId}`}
                    className="inline-flex items-center gap-2 mt-6 text-secondary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    View all trips in {activeDest.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${activeCountry}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-cream/10 flex items-center justify-center mb-4">
                    <MapPin className="w-7 h-7 text-brand-cream/40" />
                  </div>
                  <h3 className="font-serif text-xl text-brand-cream mb-2">
                    Explore {activeCountry === "uganda" ? "Uganda" : "Rwanda"}
                  </h3>
                  <p className="text-brand-cream/50 text-sm max-w-xs">
                    Click on any pin on the map to discover available safari packages for that destination
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;
