
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Symptoms must be at least 10 characters.",
  }),
  duration: z.string().min(1, {
    message: "Please specify how long you've had these symptoms.",
  }),
  severity: z.string().min(1, {
    message: "Please rate the severity of your symptoms.",
  }),
});

const IllnessForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
      duration: "",
      severity: "",
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell Us About Your Symptoms
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What symptoms are you experiencing?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your symptoms in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How long have you had these symptoms?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 3 days, 1 week..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How severe are your symptoms?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rate from 1-10..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default IllnessForm;
