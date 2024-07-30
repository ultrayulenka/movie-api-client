import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispacth, RootState } from "../store/store";
import { useSelector } from "react-redux";

const useAppDispatch = () => useDispatch<AppDispacth>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
