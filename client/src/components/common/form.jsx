// Note => src => config => index.js contains all the formInputs so that we don't have to write here repeatedly.
// We are doing this because instead of repeating the same form layout code again and again (for login, register, contact, etc.), we define just the form structure once, and pass in different configurations for each form.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {Button} from "../ui/button"
import { Input } from "../ui/input";

function CommonForm({
  formControls,  // controls the form Type
  formData,      // getting the form value
  setFormData,   // update the setForm value
  onSubmit,      // onSubmit function
  buttonText,    // what will be the button Text
  isBtnDisabled
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value=formData[getControlItem.name] || "" // It gets the value like formData of userName


    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) => setFormData({
                ...formData,  // rest formData is same
                [getControlItem.name]: event.target.value  // only changing the value
            })}
          />
        );

        break;

      case "select":
        element = (
            // onValueChange is like "onChange event" to update the value
          <Select value={value} onValueChange={(value) => setFormData({
                ...formData,
                [getControlItem.name] : value
          })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) => setFormData({
                ...formData,  // rest formData is same
                [getControlItem.name]: event.target.value  // only changing the value
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
             value={value}
            onChange={(event) => setFormData({
                ...formData,  // rest formData is same
                [getControlItem.name]: event.target.value  // only changing the value
            })}
          />
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      {/* Button will be disabled until you don't fill up the product form */}
        <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">{buttonText || "Submit"}</Button>
    </form>
  );
}

export default CommonForm;
