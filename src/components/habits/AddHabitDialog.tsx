
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const frequencies = [
  { value: "daily", label: "Každý den" },
  { value: "weekly", label: "Každý týden" },
  { value: "monthly", label: "Každý měsíc" },
];

const AddHabitSchema = z.object({
  name: z.string().min(1, "Název je povinný"),
  frequency: z.string(),
  targetValue: z.number().min(1, "Minimální hodnota musí být větší než 0"),
  targetUnit: z.string().min(1, "Jednotka je povinná"),
  categoryId: z.string().min(1, "Kategorie je povinná"),
});

interface AddHabitDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: any[];
  onHabitAdded: () => void;
}

export const AddHabitDialog = ({ isOpen, onOpenChange, categories, onHabitAdded }: AddHabitDialogProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(AddHabitSchema),
    defaultValues: {
      name: "",
      frequency: "daily",
      targetValue: 1,
      targetUnit: "",
      categoryId: "",
    },
  });

  const handleAddHabit = async (values: z.infer<typeof AddHabitSchema>) => {
    try {
      const { error } = await supabase
        .from('habits')
        .insert([{
          name: values.name,
          frequency: values.frequency,
          target_value: values.targetValue,
          target_unit: values.targetUnit,
          category_id: values.categoryId,
        }]);

      if (error) throw error;

      toast({
        title: "Návyk byl úspěšně přidán",
        description: "Můžete začít sledovat svůj nový návyk",
      });

      onOpenChange(false);
      form.reset();
      onHabitAdded();
    } catch (error) {
      toast({
        title: "Chyba při přidávání návyku",
        description: "Zkuste to prosím znovu",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="mr-2" size={20} />
          Přidat návyk
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Přidat nový návyk</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddHabit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Název návyku</Label>
                  <FormControl>
                    <Input placeholder="Např. Ranní cvičení" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <Label>Frekvence opakování</Label>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte frekvenci" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencies.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetValue"
                render={({ field }) => (
                  <FormItem>
                    <Label>Minimální laťka</Label>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="Např. 30" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetUnit"
                render={({ field }) => (
                  <FormItem>
                    <Label>Jednotka</Label>
                    <FormControl>
                      <Input placeholder="Např. minut" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <Label>Kategorie</Label>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Vyberte kategorii" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Zrušit
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Přidat návyk
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
