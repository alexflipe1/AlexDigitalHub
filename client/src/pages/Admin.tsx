import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageType, pageTypes } from "@shared/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Home, Settings, Play, Globe, Pencil, Trash, LogOut } from "lucide-react";

// Tipo para representar um botão personalizado
type CustomButton = {
  id: number;
  title: string;
  description: string;
  pageType: PageType;
  icon: string;
  iconBgColor: string;
  url: string;
  createdAt: string;
};

// Esquema para validação do formulário
const formSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  pageType: z.enum(["home", "alex", "servico", "sites", "entretenimento"] as const, {
    required_error: "Selecione uma página",
  }),
  icon: z.string().min(1, { message: "Selecione um ícone" }),
  iconBgColor: z.string().min(1, { message: "Escolha uma cor de fundo" }),
  url: z.string().url({ message: "URL inválida" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Admin() {
  const [buttons, setButtons] = useState<CustomButton[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingButton, setEditingButton] = useState<CustomButton | null>(null);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  // Inicializar o formulário com react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      pageType: "home",
      icon: "Home",
      iconBgColor: "#3b82f6",
      url: "https://",
    },
  });

  // Carregar botões
  const fetchButtons = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest<CustomButton[]>({
        url: "/api/buttons",
        method: "GET",
      });
      setButtons(data);
    } catch (error) {
      console.error("Erro ao carregar botões:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os botões",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar autenticação e buscar botões
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecionar para a página de login
      toast({
        title: "Acesso restrito",
        description: "Você precisa fazer login para acessar esta página",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }
    
    fetchButtons();
  }, [setLocation, toast]);

  // Retornar o ícone baseado no nome
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="h-6 w-6" />;
      case "Settings":
        return <Settings className="h-6 w-6" />;
      case "Play":
        return <Play className="h-6 w-6" />;
      case "Globe":
        return <Globe className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  // Formatar nomes de página para exibição
  const formatPageName = (pageType: PageType): string => {
    switch (pageType) {
      case "home":
        return "Página Inicial";
      case "alex":
        return "Alex";
      case "servico":
        return "Serviço";
      case "sites":
        return "Sites";
      case "entretenimento":
        return "Entretenimento";
      default:
        return pageType;
    }
  };

  // Manipulador de envio do formulário
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (editingButton) {
        // Modo de edição
        await apiRequest<CustomButton>({
          url: `/api/buttons/${editingButton.id}`,
          method: "PUT",
          data: values,
        });
        toast({
          title: "Botão atualizado",
          description: "O botão foi atualizado com sucesso",
        });
      } else {
        // Modo de criação
        await apiRequest<CustomButton>({
          url: "/api/buttons",
          method: "POST",
          data: values,
        });
        toast({
          title: "Botão criado",
          description: "O botão foi criado com sucesso",
        });
      }
      // Limpar formulário e atualizar lista
      form.reset();
      setEditingButton(null);
      await fetchButtons();
    } catch (error) {
      console.error("Erro ao salvar botão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o botão",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para editar um botão
  const handleEdit = (button: CustomButton) => {
    setEditingButton(button);
    form.reset({
      title: button.title,
      description: button.description,
      pageType: button.pageType,
      icon: button.icon,
      iconBgColor: button.iconBgColor,
      url: button.url,
    });
  };

  // Função para excluir um botão
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await apiRequest<void>({
        url: `/api/buttons/${id}`,
        method: "DELETE",
      });
      toast({
        title: "Botão removido",
        description: "O botão foi removido com sucesso",
      });
      await fetchButtons();
    } catch (error) {
      console.error("Erro ao excluir botão:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o botão",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancelar a edição
  const handleCancelEdit = () => {
    setEditingButton(null);
    form.reset();
  };

  // Fazer logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado da área administrativa",
    });
    setLocation("/login");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-extrabold sm:text-4xl gradient-heading">
            Administração
          </h2>
          <p className="mt-2 text-xl text-gray-600">
            Gerencie os botões personalizados do seu site
          </p>
        </div>
        <Button 
          variant="destructive" 
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      <Tabs defaultValue="createEdit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="createEdit">Criar / Editar</TabsTrigger>
          <TabsTrigger value="list">Listar Botões</TabsTrigger>
        </TabsList>

        <TabsContent value="createEdit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                  {editingButton ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  )}
                </span>
                {editingButton ? "Editar Botão" : "Criar Novo Botão"}
              </CardTitle>
              <CardDescription>
                Preencha os campos abaixo para adicionar um novo botão à sua página.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Título do botão"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Descrição curta"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pageType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Página</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma página" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {pageTypes.map((pageType) => (
                                <SelectItem key={pageType} value={pageType}>
                                  {formatPageName(pageType)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Escolha em qual página o botão será exibido
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ícone</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um ícone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Home">Home</SelectItem>
                              <SelectItem value="Settings">Settings</SelectItem>
                              <SelectItem value="Play">Play</SelectItem>
                              <SelectItem value="Globe">Globe</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Escolha um ícone para o botão
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="iconBgColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cor do Ícone</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input
                                type="color"
                                className="w-12 h-10 p-1"
                                {...field}
                              />
                              <Input
                                type="text"
                                placeholder="#3b82f6"
                                className="flex-grow"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Escolha uma cor para o ícone
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://exemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Link para onde o botão redirecionará
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    {editingButton && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                      {isLoading
                        ? "Salvando..."
                        : editingButton
                        ? "Atualizar"
                        : "Criar"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                </span>
                Botões Personalizados
              </CardTitle>
              <CardDescription>
                Lista de todos os botões personalizados do site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {buttons.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Nenhum botão personalizado foi criado ainda.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableCaption>Lista de botões personalizados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Página</TableHead>
                      <TableHead>Ícone</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buttons.map((button) => (
                      <TableRow key={button.id}>
                        <TableCell className="font-medium">
                          {button.title}
                        </TableCell>
                        <TableCell>{button.description}</TableCell>
                        <TableCell>{formatPageName(button.pageType)}</TableCell>
                        <TableCell>
                          <div
                            className="inline-flex p-2 rounded-full"
                            style={{
                              backgroundColor: `${button.iconBgColor}20`,
                            }}
                          >
                            <div
                              style={{ color: button.iconBgColor }}
                              className="h-5 w-5"
                            >
                              {getIconComponent(button.icon)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (button.url.startsWith('/')) {
                                setLocation(button.url);
                              } else {
                                setLocation(`/viewer?url=${encodeURIComponent(button.url)}&from=/admin`);
                              }
                            }}
                            className="text-blue-500 hover:underline"
                          >
                            {button.url}
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEdit(button)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Tem certeza?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta ação não pode ser desfeita. Isso excluirá
                                    permanentemente o botão "{button.title}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(button.id)}
                                  >
                                    Continuar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}