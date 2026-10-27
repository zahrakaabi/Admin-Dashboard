/* -------------------------------------------------------------------------- */
/*                                DEPEDNENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

// UI Local Components
import { 
    FormProvider, 
    RHFDateField, 
    RHFSwitch, 
    RHFTextArea, 
    RHFTextField 
} from "@/components/hook-form";

// UI Lib Components
import { Check, Trash } from 'lucide-react';
import { 
    Button,
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle
} from "@/components/ui";

// Utils
import type { EVENT } from '@/types';
import { useBoolean } from '@/hooks';

/* -------------------------------------------------------------------------- */
/*                        EVENT NEW EDIT FORM COMPONENT                       */
/* -------------------------------------------------------------------------- */
type EventNewEditFormProps = {
    currentEvent?: EVENT;
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
    onSave: (event: EVENT) => void | Promise<void>;
    onDelete?: (id: string) => void;
};

const DEFAULT_COLOR = "#8E33FF";
const EVENT_COLORS = [
    "#00A76F", "#00B8D9", "#8E33FF", "#22C55E", "#FFAB00", "#FF5630", "#1C252E",
];

function EventNewEditForm({ currentEvent, selectedDate, setSelectedDate, onSave, onDelete }: EventNewEditFormProps) {
/* --------------------------------- HOOKS ---------------------------------- */
  const [selectedColor, setSelectedColor] = useState(currentEvent?.color ?? DEFAULT_COLOR);

  const loadingSend = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

/* ---------------------------- VALIDATION SCHEMA --------------------------- */
 const NewCurrentEventSchema = Yup.object().shape({
    title: Yup.string().required('Event Name is required'),
    description: Yup.string().required('Description is required'),
    allDay: Yup.boolean(),
    start: Yup.string().required("Start date is required"),
    end: Yup.string()
        .required("End date is required")
        .test("end-after-start", "End date must be after the start date", function (value) {
            const { start } = this.parent;
            return !value || !start || value >= start;
        }),
    color: Yup.string().required("Pick a color")
 });

/* -------------------------------- CONSTANTS ------------------------------- */
  const defaultValues = useMemo(() => {
      const baseDate = selectedDate ? selectedDate.slice(0, 10) : "";

      return {
        title: currentEvent?.title || '',
        description: currentEvent?.description || '',
        allDay: currentEvent?.allDay || false,
        start: currentEvent?.start || (baseDate ? `${baseDate}T09:00` : ''),
        end: currentEvent?.end || (baseDate ? `${baseDate}T10:00` : ''),
        color: currentEvent?.color ?? DEFAULT_COLOR
      };
    },[currentEvent, selectedDate]
  );

  const methods = useForm({ 
    resolver: yupResolver(NewCurrentEventSchema),
    defaultValues
  });
  
  const {
    reset,
    watch,
    getValues,
    setValue,
    //control,
    handleSubmit,
    //formState: { isSubmitting },
  } = methods;

  const allDay = watch("allDay");
  const start = watch("start");

  useEffect(() => {
    reset(defaultValues);
    setSelectedColor(defaultValues.color);
  }, [defaultValues, reset]);

/* ---------------------------- HANDLER FUNCTIONS --------------------------- */
  const handleAllDayChange = (checked: boolean) => {
    const s = getValues("start").slice(0, 10);
    const e = getValues("end").slice(0, 10);
    setValue("start", checked ? s : `${s}T09:00`);
    setValue("end", checked ? e : `${e}T10:00`);
  };
  
  const handleEditAndSend = handleSubmit(async (data) => {
    try {
      loadingSend.onTrue();

      const eventData = {
        ...currentEvent,
        ...data,
        id: currentEvent?.id ?? crypto.randomUUID(),
      };

      onSave?.(eventData);
    
      if (currentEvent) {
        enqueueSnackbar('Event updated successfully');
      } else {
        enqueueSnackbar('Event created successfully');
      };
    
      setSelectedDate(null);
      reset();
    } catch (error) {
        console.error(error);
        enqueueSnackbar("Something went wrong. Please try again.", { variant: "error" });
    } finally {
        loadingSend.onFalse();
    };
  });

  const handleDelete = () => {
    if (!currentEvent) return;
    onDelete?.(currentEvent.id);
    enqueueSnackbar("Event deleted successfully");
    setSelectedDate(null);
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Dialog open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <DialogContent 
          showCloseButton={false} 
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-gray-100 p-0 gap-0 sm:max-w-sm overflow-hidden"
        >
            <DialogHeader className="bg-white p-4 border-b">
                <DialogTitle className="text-sm">
                    {currentEvent ? 'Edit event' : 'Add event'}
                </DialogTitle>
            </DialogHeader>
            <FormProvider methods={methods} onSubmit={handleEditAndSend}>
                <div className="flex flex-col p-4 gap-6">
                    <RHFTextField
                        type="text"
                        name="title"
                        label="Title"
                        placeholder="Title"
                    />
                    <RHFTextArea
                        name="description"
                        label="Description"
                        placeholder="Description"
                    />
                    <RHFSwitch name="allDay" label="All day" onChange={handleAllDayChange} />
                    <RHFDateField 
                        name="start" 
                        label="Start date" 
                        type={allDay ? "date" : "datetime-local"}
                    />
                    <RHFDateField 
                        name="end" 
                        label="End date" 
                        type={allDay ? "date" : "datetime-local"} 
                        min={start ?? ""} 
                    />
                    {/* color picker */}
                    <div role="radiogroup" aria-label="Event color" className="flex flex-wrap gap-2">
                        {EVENT_COLORS.map((eventColor) => (
                            <button
                                key={eventColor}
                                type="button"
                                role="radio"
                                aria-checked={selectedColor === eventColor}
                                aria-label={eventColor}
                                onClick={() => {
                                    setSelectedColor(eventColor);
                                    setValue("color", eventColor, { shouldDirty: true });
                                }}
                                style={{ backgroundColor: eventColor }}
                                className="flex size-5 cursor-pointer items-center justify-center rounded-full ring-offset-2 ring-offset-gray-100 transition"
                            >
                                {selectedColor === eventColor && <Check className="size-4 text-white" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`flex p-4 bg-white ${currentEvent ? 'justify-between' : 'justify-end'}`}>
                    {currentEvent && (
                        <Button 
                            className="!p-2 bg-transparent hover:bg-red-100 rounded-full cursor-pointer" 
                            type="button"
                            aria-label="Delete event"
                            title="Delete event"
                            onClick={handleDelete}
                        >
                            <Trash className="text-red-600 text-lg" /> 
                        </Button>
                    )}

                    <div className="flex gap-2">
                        <Button 
                            className="text-xs cursor-pointer hover:border-black" 
                            type="button"
                            aria-label='Cancel event'
                            title='Cancel event'
                            variant="outline" 
                            onClick={() => setSelectedDate(null)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="text-xs cursor-pointer" 
                            type="submit"
                            aria-label={currentEvent ? 'Update event' : 'Create event'}
                            title={currentEvent ? 'Update event' : 'Create event'}
                        >
                            {currentEvent ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>
            </FormProvider>
        </DialogContent>
    </Dialog>
  )
};

export default EventNewEditForm;