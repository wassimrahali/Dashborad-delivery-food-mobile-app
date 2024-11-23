import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import useStore from "../store"

export default function GeneralInfo() {
    const name = useStore((s) => s.name);
    const setName = useStore((s) => s.setName);
    const phone = useStore((s) => s.phone);
    const setPhone = useStore((s) => s.setPhone);
    const salary = useStore((s) => s.salary);
    const setSalary = useStore((s) => s.setSalary);
    const password = useStore((s) => s.password);
    const setPassword = useStore((s) => s.setPassword);

    return (
        <section className={cn("p-5 w-full border-2  rounded-xl")}>
            <div className="flex items-center text-black pb-3 font-semibold text-[20px] ">
                Information <Info className="ml-auto opacity-40" />
            </div>
            <div>
                <Label>Name</Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                />

                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Phone</Label>
                        <Input
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value )
                            }
                            type="text"
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Salary</Label>
                        <Input
                            max={5}
                            min={0}
                            value={salary}
                            onChange={(e) =>
                                setSalary(e.target.valueAsNumber)
                            }
                            type="number"
                            placeholder="Salary"
                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-3">
                    <div className="flex-1">
                        <Label>Password</Label>
                        <Input
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value )
                            }
                            type="text"
                            placeholder="password"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
