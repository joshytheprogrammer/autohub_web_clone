type ShowProperties = {
    display: any
    color?: string
    textSize?: string
}

export const Show = ({display, color, textSize='15px'}: ShowProperties)  =>
{
  
  return (
        <h4 
            style={{fontSize: textSize, color: color}}
        >
            {display}
        </h4>
  );
}
